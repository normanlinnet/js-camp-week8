// ========================================
// 工具函式
// ========================================

const dayjs = require('dayjs');

/**
 * 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 例如 '8折'
 */
function getDiscountRate(product) {
  const rate = Math.round((product.price / product.origin_price) * 10);
  return `${rate}折`;
}

/**
 * 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 分類陣列
 */
function getAllCategories(products) {
  return [...new Set(products.map((product) => product.category))];
}

/**
 * 格式化日期
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 格式 'YYYY/MM/DD HH:mm'，例如 '2024/01/01 08:00'
 */
function formatDate(timestamp) {
  return dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm');
}

/**
 * 計算距今天數
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 例如 '3 天前'
 */
function getDaysAgo(timestamp) {
  const today = dayjs();
  const target = dayjs.unix(timestamp);
  const days = today.diff(target, 'day');
  if (days <= 0) return '今天';
  return `${days} 天前`;
}

/**
 * 驗證訂單使用者資料
 * @param {Object} data - 使用者資料
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
function validateOrderUser(data) {
  const errors = [];
  const allowedPayments = ['ATM', 'Credit Card', 'Apple Pay'];

  if (!data.name || data.name.trim() === '') {
    errors.push('姓名不可為空');
  }
  if (!data.tel || !/^09\d{8}$/.test(data.tel)) {
    errors.push('電話必須是 09 開頭的 10 位數字');
  }
  if (!data.email || !data.email.includes('@')) {
    errors.push('Email 必須包含 @ 符號');
  }
  if (!data.address || data.address.trim() === '') {
    errors.push('地址不可為空');
  }
  if (!allowedPayments.includes(data.payment)) {
    errors.push('付款方式必須是 ATM、Credit Card 或 Apple Pay');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 驗證購物車數量
 * @param {number} quantity - 數量
 * @returns {Object} - { isValid: boolean, error?: string }
 */
function validateCartQuantity(quantity) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    return { isValid: false, error: '數量必須是整數' };
  }
  if (quantity < 1) {
    return { isValid: false, error: '數量不可小於 1' };
  }
  if (quantity > 99) {
    return { isValid: false, error: '數量不可大於 99' };
  }
  return { isValid: true };
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string} - 格式化後的金額
 */
function formatCurrency(amount) {
  return `NT$ ${amount.toLocaleString('zh-TW')}`;
}

module.exports = {
  getDiscountRate,
  getAllCategories,
  formatDate,
  getDaysAgo,
  validateOrderUser,
  validateCartQuantity,
  formatCurrency
};
