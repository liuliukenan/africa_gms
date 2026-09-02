// 导入 crypto-js 库
import CryptoJS from 'crypto-js';

// Node.js 生成随机密钥  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const secretKey = 'b8b21d0ec86bcb8306e5cef747d75ba911da5eecb839ce2a69260a53f6321649';

// 加密函数
export const encrypt = (text: string, key: string = secretKey): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

// 解密函数
export const decrypt = (ciphertext: string, key: string = secretKey): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};