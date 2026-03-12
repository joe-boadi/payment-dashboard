import PropTypes from 'prop-types'
import { Eye } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

export const PaymentTable = ({ payments, onView, sortConfig, onSort }) => {
  const headers = [
    { key: 'PaymentNumber', label: 'Payment Number' },
    { key: 'Customer', label: 'Customer' },
    { key: 'Amount', label: 'Amount' },
    { key: 'PaymentDate', label: 'Payment Date' },
  ]

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map(({ key, label }) => (
              <th key={key} onClick={() => onSort(key)} className={sortConfig.key === key ? sortConfig.direction : ''}>
                {label} {sortConfig.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.PaymentId}>
              <td>{p.PaymentNumber}</td>
              <td>{p.Customer}</td>
              <td className="amount">{formatCurrency(p.Amount)}</td>
              <td>{formatDate(p.PaymentDate)}</td>
              <td>
                <button className="view-btn" onClick={() => onView(p.PaymentId)}>
                  <Eye size={18} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

PaymentTable.propTypes = {
  payments: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
}