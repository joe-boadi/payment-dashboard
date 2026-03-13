const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://spes.pscgh.com:442/sales-api/api';

/**
 * Fetch all payments for a date range  + parse X-Pagination header
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {Promise<Object[]>}
 */
export const fetchPayments = async (startDate, endDate) => {
  const url = `${API_BASE}/Payments?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch payments: ${res.status}`);
  const payments = await res.json();

  const paginationHeader = res.headers.get('x-pagination');
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : {
    totalCount: payments.length,
    totalPages: 1,
    currentPage: 1,
    pageSize: 500,
  };

  return { payments, pagination}
};

/**
 * Fetch single payment details
 * @param {string} paymentId
 * @returns {Promise<Object>}
 */
export const fetchPaymentDetail = async (paymentId) => {
  const targetUrl = `${API_BASE}/Payments/${encodeURIComponent(paymentId)}`
  const res = await fetch(targetUrl)

  if (!res.ok) throw new Error(`Failed to fetch detail: ${res.status}`)

  return res.json()
}