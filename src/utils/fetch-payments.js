const API_BASE = 'https://spes.pscgh.com:442/sales-api/api';
const PROXY = 'https://api.allorigins.win/raw?url=';

/**
 * Fetch all payments for a date range
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {Promise<Object[]>}
 */
export const fetchPayments = async (startDate, endDate) => {
  const targetUrl = `${API_BASE}/Payments?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`;
  const url = `${PROXY}${encodeURIComponent(targetUrl)}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  return res.json();
};

/**
 * Fetch single payment details
 * @param {string} paymentId
 * @returns {Promise<Object>}
 */
export const fetchPaymentDetail = async (paymentId) => {
  const targetUrl = `${API_BASE}/Payments/${encodeURIComponent(paymentId)}`
  const url = `${PROXY}${encodeURIComponent(targetUrl)}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch detail: ${res.status}`)

  return res.json()
}