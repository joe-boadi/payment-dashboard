import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Loader } from '../loader/Loader';
import styles from './PaymentModal.module.css';

/**
 * Payment Detail Modal
 * - Shows loader while fetching
 */
export const PaymentModal = ({ payment, isOpen, loadingDetail, onClose }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ESC' || e.key === 'Escape' || e.key === 'esc') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Enter') {
        onClose();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Ensure dialog receives focus
      dialogRef.current?.focus();
    }

    // Cleanup listener when dialog closes or component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  if (loadingDetail) {
    return (
      <div className={styles.modalLoader}>
        <Loader />
        <p>Loading payment details...</p>
      </div>
    );
  }

  const renderBody = () => {
    if (!payment) return null;

    return (
      <>
        <div id={styles.modalTitle}>
          <h2>Payment Details — {payment.PaymentNumber}</h2>
        </div>

        <div className={styles.detailGrid}>
          <div>
            <strong>Customer:</strong> {payment.Customer}
          </div>
          <div>
            <strong>Amount Paid:</strong> {formatCurrency(payment.AmountPaid)}
          </div>
          <div>
            <strong>Outstanding:</strong> {formatCurrency(payment.Outstanding)}
          </div>
          <div>
            <strong>Date:</strong> {formatDate(payment.PaymentDate)}
          </div>
          <div>
            <strong>Status:</strong> {payment.Status || 'N/A'}
          </div>
          <div>
            <strong>Remarks:</strong> {payment.Remarks || '—'}
          </div>
        </div>

        {/* Mode of Payments */}
        {payment.ModeOfPayments?.length > 0 && (
          <div className="section">
            <h3>Mode of Payments</h3>
            <table className={styles.subTable}>
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Amount</th>
                  <th>Bank</th>
                  <th>Reference</th>
                </tr>
              </thead>
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
            <table className={styles.subTable}>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Total</th>
                  <th>Outstanding</th>
                  <th>Date</th>
                </tr>
              </thead>
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
          <div className={styles.payeeSection}>
            <h3>Payee Information</h3>
            <div className={styles.payeeInfo}>
              <p className={styles.payeeItem}>
                <strong>Name:</strong> {payment.Payee.FullName || 'N/A'}
              </p>
              <p className={styles.payeeItem}>
                <strong>Phone:</strong> {payment.Payee.Phone || 'N/A'}
              </p>
              <p className={styles.payeeItem}>
                <strong>Email:</strong> {payment.Payee.Email || 'N/A'}
              </p>
              <p className={styles.payeeItem}>
                <strong>Address:</strong> {payment.Payee.Address || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.modalContainer}>
      <dialog
        ref={dialogRef}
        tabIndex={'-1'}
        open={isOpen}
        className={styles.modal}
        onClick={onClose}
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} role="document">
          <button
            className={styles.closeBtn}
            onClick={onClose}
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <span className={styles.modalInfo}>Press ESC or Enter to Close *</span>
          {renderBody()}
        </div>
      </dialog>
    </div>
  );
};

PaymentModal.propTypes = {
  payment: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  loadingDetail: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
