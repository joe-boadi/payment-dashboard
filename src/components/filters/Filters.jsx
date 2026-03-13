import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import styles from './Filter.module.css';
export const Filters = ({
  startDate,
  endDate,
  searchTerm,
  onStartChange,
  onEndChange,
  onSearchChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.dateRange}>
        <label>
          From{' '}
          <input
            title="Date From"
            name="date"
            type="date"
            value={startDate}
            onChange={onStartChange}
          />
        </label>
        <label>
          To{' '}
          <input title="Date To" name="date" type="date" value={endDate} onChange={onEndChange} />
        </label>
      </div>
      <div className={styles.search}>
        <Search size={18} />
        <input
          title="Search Payments"
          type="text"
          name="search"
          placeholder="Search customer or payment number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e)}
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
