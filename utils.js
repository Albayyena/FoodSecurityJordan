/**
 * تنسيق رقم باستخدام الفواصل العربية
 * @param {number} num
 * @returns {string}
 */
function formatNumber(num) {
  return typeof num === 'number' && isFinite(num)
    ? num.toLocaleString('ar-EG')
    : '—';
}

/**
 * ترجمة الاستخدامات للنباتات من العربية إلى إنجليزية
 * @param {string} arabicUsage
 * @returns {string}
 */
function translateUsage(arabicUsage) {
  const map = {
    "طبي": "Medicinal",
    "عطري": "Aromatic",
    "زينة": "Decorative",
    "برّي": "Wild"
  };
  return map[arabicUsage?.trim()] || 'Unknown';
}

/**
 * تحويل وحدات المساحة من هكتار إلى متر مربع
 * @param {number} hectares
 * @returns {number}
 */
function hectaresToSquareMeters(hectares) {
  return typeof hectares === 'number' && isFinite(hectares)
    ? Math.round(hectares * 10000)
    : 0;
}

/**
 * تقصير النص الطويل مع إضافة نقاط
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function truncate(text, maxLength = 100) {
  if (typeof text !== 'string') return '';
  const clean = text.trim();
  return clean.length > maxLength
    ? clean.slice(0, maxLength).trim() + '…'
    : clean;
}
