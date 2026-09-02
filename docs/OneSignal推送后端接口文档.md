# OneSignal 推送管理 - 后端接口文档

## 一、概述

后台管理系统通过后端服务 **代理调用 OneSignal REST API**，实现定员推送和全员推送功能。

> **为什么需要后端代理？**
> OneSignal REST API 需要 `REST API Key` 作为认证凭证，该 Key 是私密密钥，绝不能暴露在前端代码中。后端从服务器环境变量读取 Key，安全地转发请求。

**OneSignal API 文档**: https://documentation.onesignal.com/reference/create-notification

---

## 二、环境变量配置（后端 .env）

```bash
# OneSignal App ID（UUID 格式）
ONESIGNAL_APP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# OneSignal REST API Key
ONESIGNAL_REST_API_KEY=YOUR_REST_API_KEY
```

> ⚠️ REST API Key 绝对不能配置在 `VITE_*` 前缀的环境变量中（`VITE_*` 会被打包到前端代码）。

### 如何获取这两个值？

1. 登录 [OneSignal Dashboard](https://app.onesignal.com)
2. 选择你的 App（与 H5 项目使用的是同一个 OneSignal 应用）
3. 右上角 **Settings** → **Keys & IDs**
4. 页面中可以找到：

| 值 | 页面中对应名称 | 说明 |
|---|---|---|
| `ONESIGNAL_APP_ID` | **OneSignal App ID** | UUID 格式，H5 SDK 初始化时已用过 |
| `ONESIGNAL_REST_API_KEY` | **REST API Key** | 服务端调用 API 的认证密钥 |

> ⚠️ 注意区分 **REST API Key**（服务端用）和 **User Auth Key**（个人账号用），这里需要的是 **REST API Key**。如果没有，点 **"New Key"** 创建一个。

---

## 三、数据库表设计

### `one_signal_push` 表

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | BIGINT | 是 | 主键，自增 |
| `push_type` | VARCHAR(20) | 是 | 推送类型：`TARGETED`=定员推送，`BROADCAST`=全员推送 |
| `country_code` | INT | 否 | 国家代码（如 254=肯尼亚） |
| `title` | VARCHAR(200) | 是 | 推送标题 |
| `content` | TEXT | 是 | 推送内容 |
| `target_user_ids` | TEXT | 否 | 目标用户ID列表（JSON数组，定员推送时使用） |
| `target_count` | INT | 否 | 目标用户数 |
| `success_count` | INT | 否 | 成功推送数（OneSignal 返回的 recipients） |
| `failed_count` | INT | 否 | 失败推送数 |
| `status` | TINYINT | 是 | 状态：0=待发送，1=发送中，2=已完成，3=失败 |
| `notification_id` | VARCHAR(100) | 否 | OneSignal 返回的通知ID |
| `error_msg` | TEXT | 否 | 错误信息 |
| `create_by` | VARCHAR(50) | 否 | 创建人 |
| `create_time` | DATETIME | 是 | 创建时间 |
| `update_time` | DATETIME | 是 | 更新时间 |

```sql
-- MySQL DDL 参考
CREATE TABLE `one_signal_push` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `push_type` VARCHAR(20) NOT NULL COMMENT '推送类型：TARGETED=定员推送, BROADCAST=全员推送',
  `country_code` INT DEFAULT NULL COMMENT '国家代码',
  `title` VARCHAR(200) NOT NULL COMMENT '推送标题',
  `content` TEXT NOT NULL COMMENT '推送内容',
  `target_user_ids` TEXT DEFAULT NULL COMMENT '目标用户ID列表（JSON数组）',
  `target_count` INT DEFAULT 0 COMMENT '目标用户数',
  `success_count` INT DEFAULT 0 COMMENT '成功推送数',
  `failed_count` INT DEFAULT 0 COMMENT '失败推送数',
  `status` TINYINT NOT NULL DEFAULT 0 COMMENT '0=待发送, 1=发送中, 2=已完成, 3=失败',
  `notification_id` VARCHAR(100) DEFAULT NULL COMMENT 'OneSignal通知ID',
  `error_msg` TEXT DEFAULT NULL COMMENT '错误信息',
  `create_by` VARCHAR(50) DEFAULT NULL COMMENT '创建人',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_push_type` (`push_type`),
  KEY `idx_country_code` (`country_code`),
  KEY `idx_status` (`status`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='OneSignal推送记录表';
```

---

## 四、API 接口

> **基础路径**: `{API_BASE_URL}/oneSignalPush`
> 
> 当前开发环境 `API_BASE_URL` = `http://gms.wildwintop.com/api/platform`

---

### 4.1 发送推送通知

```
POST /oneSignalPush/send
```

**功能**: 创建推送记录 → 调用 OneSignal API 发送推送 → 更新推送记录状态和结果。

**业务逻辑**:

1. 解析前端发来的 `pushType`, `title`, `content`, `targetUserIds` 等
2. 在 `one_signal_push` 表插入一条记录，状态设为 `0`（待发送）
3. 根据 `pushType` 构造 OneSignal 请求体，调用 OneSignal REST API
4. 调用成功 → 用 OneSignal 返回的 `id` 和 `recipients` 更新记录（状态=2）
5. 调用失败 → 更新记录状态为 `3`，记录 `error_msg`
6. 返回最终的推送记录 VO

**请求体** (`OneSignalPushSend`):

```json
{
  "pushType": "TARGETED",           // TARGETED=定员推送, BROADCAST=全员推送
  "countryCode": 254,               // 国家代码（可选）
  "title": "活动通知",               // 推送标题
  "content": "限时优惠，快来参与！", // 推送内容
  "targetUserIds": [1001, 1002],    // 目标用户ID（定员推送必填）
  "appPushTemplateId": 1            // APP推送模板ID（可选）
}
```

**构造 OneSignal API 请求**:

```javascript
// 定员推送 (TARGETED) - 通过 external_id 匹配
const oneSignalBody = {
  app_id: process.env.ONESIGNAL_APP_ID,
  include_aliases: {
    external_id: targetUserIds.map(id => String(id))
  },
  target_channel: "push",
  headings: { "en": title },
  contents: { "en": content }
};

// 全员推送 (BROADCAST) - 发送给所有活跃订阅用户
const oneSignalBody = {
  app_id: process.env.ONESIGNAL_APP_ID,
  included_segments: ["Active Subscriptions"],
  headings: { "en": title },
  contents: { "en": content }
};

// 调用 OneSignal API
POST https://onesignal.com/api/v1/notifications
Authorization: Basic {ONESIGNAL_REST_API_KEY}
Content-Type: application/json
```

**成功响应**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "pushType": "TARGETED",
    "countryCode": 254,
    "title": "活动通知",
    "content": "限时优惠，快来参与！",
    "targetCount": 2,
    "successCount": 2,
    "failedCount": 0,
    "status": 2,
    "notificationId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "errorMsg": null,
    "createBy": "admin",
    "createTime": "2026-06-15 15:30:00",
    "updateTime": "2026-06-15 15:30:01"
  }
}
```

---

### 4.2 分页查询推送记录

```
POST /oneSignalPush/list
```

**请求体** (`OneSignalPushQuery`):

```json
{
  "page": 1,                      // 页码
  "limit": 10,                    // 每页条数
  "id": null,                     // 推送ID筛选
  "pushType": "TARGETED",         // 推送类型筛选
  "countryCode": 254,             // 国家筛选
  "status": 2,                    // 状态筛选：0=待发送, 1=发送中, 2=已完成, 3=失败
  "startDate": "2026-06-01",     // 开始时间
  "endDate": "2026-06-15",       // 结束时间
  "sortName": "createTime",      // 排序字段
  "orderName": "descending"      // 排序方式: ascending/descending
}
```

**成功响应**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "pushType": "TARGETED",
        "countryCode": 254,
        "title": "活动通知",
        "content": "限时优惠，快来参与！",
        "targetCount": 2,
        "successCount": 2,
        "failedCount": 0,
        "status": 2,
        "notificationId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "errorMsg": null,
        "createBy": "admin",
        "createTime": "2026-06-15 15:30:00",
        "updateTime": "2026-06-15 15:30:01"
      }
    ],
    "total": 1
  }
}
```

---

### 4.3 查询推送详情

```
GET /oneSignalPush/{id}
```

**成功响应**:

```json
{
  "code": 0,
  "message": "success",
  "data": { /* OneSignalPushVO，同上 */ }
}
```

---

### 4.4 删除推送记录

```
DELETE /oneSignalPush/{id}
```

**成功响应**:

```json
{ "code": 0, "message": "删除成功", "data": null }
```

**注意**: 删除操作只删除数据库记录，不会也无法撤回已发送的 OneSignal 通知。

---

### 4.5 批量删除推送记录

```
DELETE /oneSignalPush/batchDelete
```

**请求体**:

```json
[1, 2, 3]
```

**成功响应**:

```json
{ "code": 0, "message": "删除成功", "data": null }
```

---

## 五、OneSignal REST API 调用参考

### 认证方式

```http
Authorization: Basic {REST_API_KEY}
```

（注意：OneSignal 使用 Basic Auth，username 为空，password 为 REST API Key）

### 定员推送请求示例

```bash
curl -X POST "https://onesignal.com/api/v1/notifications" \
  -H "Authorization: Basic YOUR_REST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "app_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "include_aliases": {
      "external_id": ["1001", "1002", "1003"]
    },
    "target_channel": "push",
    "headings": { "en": "活动通知" },
    "contents": { "en": "限时优惠，快来参与！" }
  }'
```

### 全员推送请求示例

```bash
curl -X POST "https://onesignal.com/api/v1/notifications" \
  -H "Authorization: Basic YOUR_REST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "app_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "included_segments": ["Active Subscriptions"],
    "headings": { "en": "系统公告" },
    "contents": { "en": "系统将于今晚维护" }
  }'
```

### OneSignal 响应示例

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "recipients": 2,
  "external_id": null,
  "errors": null
}
```

### 完整调用伪代码 (Java 示例)

```java
public OneSignalPushVO sendPush(OneSignalPushSend sendRequest) {
    // 1. 插入推送记录，状态=0(待发送)
    OneSignalPush push = new OneSignalPush();
    push.setPushType(sendRequest.getPushType());
    push.setCountryCode(sendRequest.getCountryCode());
    push.setTitle(sendRequest.getTitle());
    push.setContent(sendRequest.getContent());
    push.setTargetUserIds(JSON.toJSONString(sendRequest.getTargetUserIds()));
    push.setTargetCount(
        sendRequest.getTargetUserIds() != null 
            ? sendRequest.getTargetUserIds().size() 
            : 0
    );
    push.setStatus(0); // 待发送
    push.setCreateBy(getCurrentUser());
    pushMapper.insert(push);
    
    // 2. 更新状态为发送中
    push.setStatus(1); // 发送中
    pushMapper.updateById(push);
    
    // 3. 构造 OneSignal 请求体并发送
    try {
        Map<String, Object> oneSignalBody = new HashMap<>();
        oneSignalBody.put("app_id", oneSignalAppId);
        oneSignalBody.put("headings", Map.of("en", push.getTitle()));
        oneSignalBody.put("contents", Map.of("en", push.getContent()));
        
        if ("TARGETED".equals(sendRequest.getPushType())) {
            oneSignalBody.put("target_channel", "push");
            oneSignalBody.put("include_aliases", Map.of(
                "external_id", sendRequest.getTargetUserIds().stream()
                    .map(String::valueOf).collect(Collectors.toList())
            ));
        } else {
            oneSignalBody.put("included_segments", List.of("Active Subscriptions"));
        }
        
        // 调用 OneSignal API
        String response = httpClient.post(
            "https://onesignal.com/api/v1/notifications",
            oneSignalBody,
            "Basic " + oneSignalRestApiKey
        );
        
        OneSignalResponse osResponse = JSON.parseObject(response, OneSignalResponse.class);
        
        // 4. 更新记录为已完成
        push.setStatus(2); // 已完成
        push.setNotificationId(osResponse.getId());
        push.setSuccessCount(osResponse.getRecipients());
        pushMapper.updateById(push);
        
    } catch (Exception e) {
        // 5. 更新记录为失败
        push.setStatus(3); // 失败
        push.setErrorMsg(e.getMessage());
        pushMapper.updateById(push);
    }
    
    return pushMapper.selectById(push.getId());
}
```

---

## 六、前置依赖（H5 客户端）

确认 H5 项目中已完成以下配置，否则推送无法送达：

1. **OneSignal SDK 已初始化**，用户成功订阅推送
2. **用户登录后已调用 `setAlias(external_id)`**，将 `external_id` 设为用户的 `uid`
   - 这是定员推送的前提，后端通过 `external_id` 匹配目标用户
3. **Service Worker** 文件 `OneSignalSDKWorker.js` 已放置在正确路径

---

## 七、重要注意事项

| 事项 | 说明 |
|---|---|
| **REST API Key 安全** | 只能配置在后端环境变量，绝不能通过 `VITE_*` 或任何方式传递到前端 |
| **external_id 映射** | H5 客户端登录后必须调用 OneSignal `login(uid)` / `addAlias("external_id", uid)`，后端定员推送时通过 `include_aliases.external_id` 匹配用户 |
| **删除只是删记录** | 删除推送记录不会撤回已发送的通知（OneSignal 不支持撤回） |
| **大批量定员推送** | OneSignal 单次 `external_id` 数量有限制（文档未明确，建议不超过 2000），前端已限制 |
| **全员推送范围** | `Active Subscriptions` 表示所有已订阅且活跃的设备，不受国家筛选影响。如需按国家筛选全员推送用户，需用 `included_segments` + `filters` 或使用 tag 方案 |
