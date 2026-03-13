import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Pagination component - shows max 10 items per page
 */
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return (
        <div className="pagination">
        <button
            title='Previous Page'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
            aria-label="Previous page"
        >
            <ChevronLeft size={18} /> Prev
        </button>

        {pages.map((page) => (
            <button
            title={`Page ${page}`}
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            >
            {page}
            </button>
        ))}

        <button
            title='Next Page'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
            aria-label="Next page"
        >
            Next <ChevronRight size={18} />
        </button>
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}