import PropTypes from 'prop-types'
import { Search } from 'lucide-react'

export const Filters = ({ startDate, endDate, searchTerm, onStartChange, onEndChange, onSearchChange }) => {
  return (
    <div className="filters">
      <div className="date-range">
        <label>From <input name='date' type="date" value={startDate} onChange={onStartChange} /></label>
        <label>To <input name='date' type="date" value={endDate} onChange={onEndChange} /></label>
      </div>
      <div className="search">
        <Search size={18} />
        <input
          type="text"
          name='search'
          placeholder="Search customer or payment number..."
          value={searchTerm}
          className='query-data'
          onChange={onSearchChange}
        />
      </div>
    </div>
  )
}

Filters.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}