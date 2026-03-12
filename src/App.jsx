import { useState, useEffect, useMemo, useCallback } from 'react'
import { fetchPayments, fetchPaymentDetail, debounce } from './utils'
import {Filters, PaymentTable, PaymentModal, Pagination, ErrorPage, Loader} from './components'
import './App.css'

function App() {

  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'PaymentDate', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  
  const ITEMS_PER_PAGE = 10

    // Reset to first page when filters, search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, startDate, endDate, sortConfig.key, sortConfig.direction])

  // Default dates: last 30 days
  useEffect(() => {
    const end = new Date().toISOString().split('T')[0]
    const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    setStartDate(start)
    setEndDate(end)
  }, [])

  // Fetch data
  const loadPayments = useCallback(async () => {
    if (!startDate || !endDate) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPayments(startDate, endDate)
      setPayments(data)
    } catch (err) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [startDate, endDate])

  useEffect(() => {
    loadPayments()
  }, [loadPayments])


  // Debounced search
  const debouncedSearch = useMemo(() => debounce((term) => setSearchTerm(term), 300), [])

  // Filtered + Sorted data (useMemo → no re-renders on every keystroke)
  const processedPayments = useMemo(() => {
    let result = [...payments]

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p =>
        p.Customer?.toLowerCase().includes(term) ||
        p.PaymentNumber?.toLowerCase().includes(term)
      )
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key]
        let valB = b[sortConfig.key]
        if (sortConfig.key === 'Amount') {
          valA = Number(valA)
          valB = Number(valB)
        }
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }
    return result
  }, [payments, searchTerm, sortConfig])

    // Pagination calculations
  const totalPages = Math.ceil(processedPayments.length / ITEMS_PER_PAGE)
  const currentPayments = processedPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleView = async (paymentId) => {
    try {
      const detail = await fetchPaymentDetail(paymentId)
      setSelectedPayment(detail)
      setModalOpen(true)
    } catch (err) {
      alert('Failed to load payment details: ' + err.message)
    }
  }

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

    // Lock scroll + apply strong backdrop class when modal opens
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open')
      document.body.style.overflow = 'hidden'   // prevents scrolling behind modal
    } else {
      document.body.classList.remove('modal-open')
      document.body.style.overflow = 'visible'
    }

    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.overflow = 'visible'
    }
  }, [modalOpen])

  const closeModal = () => {
    setModalOpen(false)
    setSelectedPayment(null)
  }

  return (
    <>
      <header>
        <h1>Customer Payments Dashboard</h1>
        <p>Shop Vendor Portal</p>
      </header>

      <div className="container">
        <Filters
          startDate={startDate}
          endDate={endDate}
          searchTerm={searchTerm}
          onStartChange={e => setStartDate(e.target.value)}
          onEndChange={e => setEndDate(e.target.value)}
          onSearchChange={e => debouncedSearch(e.target.value)}
        />

        {error && <div className="error"><ErrorPage error={error} /></div>}
        {loading && <div className="loading"><Loader /></div>}

        {!loading && !error && (
          <>
            {processedPayments.length === 0 ? (
              <div className="empty">No payments found for the selected period.</div>
            ) : (
              <PaymentTable
                payments={currentPayments}
                onView={handleView}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            )}
            {/* Pagination Controls */}
              {processedPayments.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
          </>
        )}
      </div>
      <PaymentModal
        payment={selectedPayment}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  )
}

export default App