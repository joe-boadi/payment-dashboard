import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils'

export const PaymentModal = ({ payment, isOpen, onClose }) => {
  if (!payment || !isOpen) return null

  return (
    <dialog open={isOpen} className="modal" onClick={onClose} aria-modal aria-labelledby='modal-title'>
      <section className="modal-content" role='note' onClick={e => e.stopPropagation()}>
        
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className='modal-header' style={{marginBottom: '1.5rem',paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0'}}>
            <h2 style={{margin: 0, color: 'var(--primary)'}}>
              Payment Details – {payment.PaymentNumber}
            </h2>
        </div>

        <div className="detail-grid">
          <div><strong>Customer:</strong> {payment.Customer}</div>
          <div><strong>Amount Paid:</strong> {formatCurrency(payment.AmountPaid)}</div>
          <div><strong>Outstanding:</strong> {formatCurrency(payment.Outstanding)}</div>
          <div><strong>Date:</strong> {formatDate(payment.PaymentDate)}</div>
          <div><strong>Status:</strong> {payment.Status}</div>
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
                  <tr key={i}>
                    <td>{m.ModeOfPayment}</td>
                    <td>{formatCurrency(m.Amount)}</td>
                    <td>{m.Bank}</td>
                    <td>{m.Reference}</td>
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
                  <tr key={i}>
                    <td>{inv.InvoiceNumber}</td>
                    <td>{formatCurrency(inv.TotalAmount)}</td>
                    <td>{formatCurrency(inv.Outstanding)}</td>
                    <td>{formatDate(inv.InvoiceDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payee */}
        {payment.Payee && (
          <div className="section">
            <h3>Payee Information</h3>
            <p><strong>Name:</strong> {payment.Payee.FullName}</p>
            <p><strong>Phone:</strong> {payment.Payee.Phone}</p>
            <p><strong>Email:</strong> {payment.Payee.Email}</p>
            <p><strong>Address:</strong> {payment.Payee.Address}</p>
          </div>
        )}
      </section>
    </dialog>
  )
}

PaymentModal.propTypes = {
  payment: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}