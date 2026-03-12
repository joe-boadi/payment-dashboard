const _BASE_URL = 'https://spes.pscgh.com:442/sales-api/api';

const getApiBase = () => {
  // Production (Netlify) → uses free CORS proxy
  if (import.meta.env.PROD) {
    return `https://corsproxy.io/?url=${encodeURIComponent(_BASE_URL)}`;
  }
  // Local development → uses your existing Vite proxy
  return '/sales-api/api';
};

/**
 * Fetch all payments for a date range
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {Promise<Object[]>}
 */
export const fetchPayments = async (startDate, endDate) => {
  const url = `${getApiBase()}/Payments?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch payments: ${res.status}`)
  return res.json()
}

/**
 * Fetch single payment details
 * @param {string} paymentId
 * @returns {Promise<Object>}
 */
export const fetchPaymentDetail = async (paymentId) => {
  const url = `${getApiBase()}/Payments/${encodeURIComponent(paymentId)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch detail: ${res.status}`)
  return res.json()
}