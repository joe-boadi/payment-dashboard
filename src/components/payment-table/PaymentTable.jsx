import PropTypes from 'prop-types';
import { Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { headers } from '../../data/payment-table-headers';
import styles from './PaymentTable.module.css';

export const PaymentTable = ({ payments, onView, sortConfig, onSort }) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            {headers.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => onSort(key)}
                className={sortConfig.key === key ? sortConfig.direction : ''}
              >
                {label} {sortConfig.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.PaymentId}>
              <td title="Payment Number">{p.PaymentNumber}</td>
              <td title="Customer">{p.Customer}</td>
              <td title="Payment Amount" className="amount">
                {formatCurrency(p.Amount)}
              </td>
              <td title="Payment Date">{formatDate(p.PaymentDate)}</td>
              <td>
                <button
                  type="button"
                  title="View Details"
                  className={styles.viewBtn}
                  onClick={() => onView(p.PaymentId)}
                >
                  <Eye size={18} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PaymentTable.propTypes = {
  payments: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};
