import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'
import { Loader } from './Loader'

/**
 * Payment Detail Modal
 * - Shows loader while fetching
 * - Clean, readable logic (no nested ternary)
 */
export const PaymentModal = ({ payment, isOpen, loadingDetail, onClose }) => {
  
  if (!isOpen) return null

  if (loadingDetail) {
    return (
      <div className="modal-loader">
        <Loader />
      </div>
    )
  }

  const renderBody = () => {

    if (!payment) return null

    return (
      <>
        <div id="modal-title">
          <h2>Payment Details — {payment.PaymentNumber}</h2>
        </div>

        <div className="detail-grid">
          <div><strong>Customer:</strong> {payment.Customer}</div>
          <div><strong>Amount Paid:</strong> {formatCurrency(payment.AmountPaid)}</div>
          <div><strong>Outstanding:</strong> {formatCurrency(payment.Outstanding)}</div>
          <div><strong>Date:</strong> {formatDate(payment.PaymentDate)}</div>
          <div><strong>Status:</strong> {payment.Status || 'N/A'}</div>
          <div><strong>Remarks:</strong> {payment.Remarks || '—'}</div>
        </div>

        {/* Mode of Payments */}
        {payment.ModeOfPayments?.length > 0 && (
          <div className="section">
            <h3>Mode of Payments</h3>
            <table className="sub-table">
              <thead><tr><th>Mode</th><th>Amount</th><th>Bank</th><th>Reference</th></tr></thead>
              <tbody>
                {payment.ModeOfPayments.map((m, i) => (
                  <tr key={`mode-${m.Reference || m.ModeOfPayment || i}`}>
                    <td>{m.ModeOfPayment || '—'}</td>
                    <td>{formatCurrency(m.Amount) || '—'}</td>
                    <td>{m.Bank || '—'}</td>
                    <td>{m.Reference || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoices */}
        {payment.invoices?.length > 0 && (
          <div className="section">
            <h3>Invoices</h3>
            <table className="sub-table">
              <thead><tr><th>Invoice #</th><th>Total</th><th>Outstanding</th><th>Date</th></tr></thead>
              <tbody>
                {payment.invoices.map((inv, i) => (
                  <tr key={inv.Id || `inv-${inv.InvoiceNumber || i}`}>
                    <td>{inv.InvoiceNumber || '—'}</td>
                    <td>{formatCurrency(inv.TotalAmount) || '—'}</td>
                    <td>{formatCurrency(inv.Outstanding) || '—'}</td>
                    <td>{formatDate(inv.InvoiceDate) || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payee */}
        {payment.Payee && (
          <div className="payee-section">
            <h3>Payee Information</h3>
            <div className='payee-info'>
              <p className='payee-item'><strong>Name:</strong> {payment.Payee.FullName || 'N/A'}</p>
              <p className='payee-item'><strong>Phone:</strong> {payment.Payee.Phone || 'N/A'}</p>
              <p className='payee-item'><strong>Email:</strong> {payment.Payee.Email || 'N/A'}</p>
              <p className='payee-item'><strong>Address:</strong> {payment.Payee.Address || 'N/A'}</p>
            </div>
          </div>
        )}
      </>
    )
  }

   return (
    <div className='modal-container'>
      <dialog
        open={isOpen}
        className="modal"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>

          {renderBody()}
        </div>
      </dialog>
    </div>
  )
}

PaymentModal.propTypes = {
  payment: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  loadingDetail: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}