const API_BASE = import.meta.env.VITE_API_BASE_URL

/**
 * Fetch all payments for a date range
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {Promise<Object[]>}
 */
export const fetchPayments = async (startDate, endDate) => {
  const url = `${API_BASE}/Payments?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`
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
  const url = `${API_BASE}/Payments/${encodeURIComponent(paymentId)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch detail: ${res.status}`)
  return res.json()
}