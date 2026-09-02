import { useConfigStore } from "@/store/modules/config";

export function formatCurrency(num) {
  if (!num) {
    return '0.00';
  }
  num = num.toString().replace(/\$|,/g, '');
  if (isNaN(num)) num = '0';
  var sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  var cents: number | string = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = '0' + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  return (sign ? '' : '-') + num + '.' + cents;
}

export function digit(value, length = 2) {
  if (value == null) {
    return '';
  }
  if (String(value).length >= length) {
    return String(value);
  }
  return (Array(length).join('0') + value).slice(-length);
}
// 原来的函数
export function toDateString111(time, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!time) {
    return '';
  }
  const transformStr = (str) => {
    if (typeof str === 'string') {
      if (str.includes('T')) {
        return str.replace(/\//g, '-');
      } else {
        return str.replace(/-/g, '/');
      }
    } else if (typeof str === 'number' && String(str).length === 10) {
      return str * 1e3;
    }
    return str;
  };
  const date = new Date(transformStr(time));
  const ymd = [digit(date.getFullYear(), 4), digit(date.getMonth() + 1), digit(date.getDate())];
  const hms = [digit(date.getHours()), digit(date.getMinutes()), digit(date.getSeconds())];
  return format.replace(/yyyy/g, ymd[0]).replace(/MM/g, ymd[1]).replace(/dd/g, ymd[2]).replace(/HH/g, hms[0]).replace(/mm/g, hms[1]).replace(/ss/g, hms[2]).replace(/YYYY/g, ymd[0]).replace(/DD/g, ymd[2]);
}
export function toDateString(time, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!time && time !== 0) {
    return '';
  }

  const digit = (num, length = 2) => {
    return num.toString().padStart(length, '0');
  };

  const transformStr = (input) => {
    if (typeof input === 'string') {
      if (input.includes('T')) {
        return input.replace(/\//g, '-');
      } else {
        return input.replace(/-/g, '/');
      }
    } else if (typeof input === 'number') {
      // 先转换为字符串，移除末尾多余的0
      const timeStr = String(input);

      // 判断时间戳类型的主要逻辑
      // 1. 如果是纯数字（没有小数点）
      if (!timeStr.includes('.')) {
        // 通过数字范围判断
        if (input >= 1e12 && input < 1e14) {
          // 13位左右的数字，当作毫秒
          return input;
        } else if (input >= 1e9 && input < 1e10) {
          // 10位数字，当作秒
          return input * 1000;
        } else if (input < 1e9) {
          // 小于10位的数字，需要进一步判断
          // 检查当作毫秒是否合理
          const date = new Date(input);
          const year = date.getFullYear();
          // 如果年份在1970-2100之间，当作毫秒
          if (year >= 1970 && year <= 2100) {
            return input;
          }
          // 否则当作秒
          return input * 1000;
        }
      }
      // 2. 如果有小数点（带小数的时间戳）
      else {
        const parts = timeStr.split('.');
        const integerPart = parseInt(parts[0], 10);

        // 判断整数部分的长度
        if (integerPart >= 1e9 && integerPart < 1e10) {
          // 整数部分10位，是秒级时间戳
          return integerPart * 1000;
        } else if (integerPart >= 1e12 && integerPart < 1e14) {
          // 整数部分13位，是毫秒时间戳
          return integerPart;
        }

        // 如果以上都不匹配，当作毫秒处理
        return input;
      }

      // 默认返回原值
      return input;
    }
    return input;
  };

  try {
    const date = new Date(transformStr(time));

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', time);
      return '';
    }

    const ymd = [
      digit(date.getFullYear(), 4),
      digit(date.getMonth() + 1),
      digit(date.getDate())
    ];
    const hms = [
      digit(date.getHours()),
      digit(date.getMinutes()),
      digit(date.getSeconds())
    ];

    return format
      .replace(/yyyy/g, ymd[0])
      .replace(/MM/g, ymd[1])
      .replace(/dd/g, ymd[2])
      .replace(/HH/g, hms[0])
      .replace(/mm/g, hms[1])
      .replace(/ss/g, hms[2])
      .replace(/YYYY/g, ymd[0])
      .replace(/DD/g, ymd[2]);
  } catch (error) {
    console.error('Date conversion error:', error);
    return '';
  }
}

// 时间戳转换为指定时区的字符串
export function toDateZone(time, code?: number) {
  if (!time) {
    return '';
  }

  const format = 'yyyy-MM-dd HH:mm:ss';
  const actualCode = code;

  const transformStr = (str) => {
    if (typeof str === 'string') {
      // 字符串时间格式处理（保持原有逻辑）
      if (str.includes('T')) {
        return str.replace(/\//g, '-');
      } else {
        return str.replace(/-/g, '/');
      }
    } else if (typeof str === 'number') {
      // 核心修复：精准判断秒级/毫秒级时间戳
      const numStr = str.toString().split('.')[0]; // 取整数部分（去掉小数）
      const intLength = numStr.length;

      // 规则：
      // 1. 整数部分长度 10 位 → 秒级时间戳，转毫秒
      // 2. 整数部分长度 13 位 → 毫秒级时间戳，直接使用
      // 3. 其他长度 → 尝试转数字后直接使用（兼容异常场景）
      if (intLength === 10) {
        return str * 1e3;
      } else if (intLength === 13) {
        return str;
      } else {
        // 兜底：如果是异常长度，直接返回原数（避免错误转换）
        return str;
      }
    }
    return str;
  };

  const date = new Date(transformStr(time));
  // 额外校验：如果 Date 无效，返回空（避免 NaN 时间）
  if (isNaN(date.getTime())) {
    return '';
  }

  // 时区处理逻辑（保持原有逻辑）
  if (actualCode) {
    const timezone = getTimeZone(actualCode);
    if (timezone) {
      try {
        const formatter = new Intl.DateTimeFormat('zh-CN', {
          timeZone: timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        const parts = formatter.formatToParts(date);
        const values: any = {};
        parts.forEach(part => {
          values[part.type] = part.value;
        });
        return format
          .replace(/yyyy|YYYY/g, values.year)
          .replace(/MM/g, values.month)
          .replace(/dd|DD/g, values.day)
          .replace(/HH/g, values.hour)
          .replace(/mm/g, values.minute)
          .replace(/ss/g, values.second);
      } catch (e) {
        console.error('Timezone format error:', e);
      }
    }
  }

  // 默认本地时间格式化（保持原有逻辑，简化 replace 写法）
  const ymd = [digit(date.getFullYear(), 4), digit(date.getMonth() + 1), digit(date.getDate())];
  const hms = [digit(date.getHours()), digit(date.getMinutes()), digit(date.getSeconds())];
  return format
    .replace(/yyyy|YYYY/g, ymd[0])
    .replace(/MM/g, ymd[1])
    .replace(/dd|DD/g, ymd[2])
    .replace(/HH/g, hms[0])
    .replace(/mm/g, hms[1])
    .replace(/ss/g, hms[2]);
}


// 获取指定countryCode对应的时区
export const getTimeZone = (code: number) => {
  const configStore = useConfigStore();
  if (configStore.countryArr && Array.isArray(configStore.countryArr)) {
    for (const item of configStore.countryArr) {
      if (item.code === code) {
        return item.timezone;
      }
    }
  }
  return undefined;
}
export function toDayKey(time, format = 'yyyyMMdd') {
  if (!time) {
    return '';
  }
  const transformStr = (str) => {
    if (typeof str === 'string') {
      if (str.includes('T')) {
        return str.replace(/\//g, '-');
      } else {
        return str.replace(/-/g, '/');
      }
    } else if (typeof str === 'number' && String(str).length === 10) {
      return str * 1e3;
    }
    return str;
  };
  const date = new Date(transformStr(time));
  const ymd = [digit(date.getFullYear(), 4), digit(date.getMonth() + 1), digit(date.getDate())];
  const hms = [digit(date.getHours()), digit(date.getMinutes()), digit(date.getSeconds())];
  return format.replace(/yyyy/g, ymd[0]).replace(/MM/g, ymd[1]).replace(/dd/g, ymd[2]).replace(/HH/g, hms[0]).replace(/mm/g, hms[1]).replace(/ss/g, hms[2]).replace(/YYYY/g, ymd[0]).replace(/DD/g, ymd[2]);
}
