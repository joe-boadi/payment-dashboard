import { useState, useEffect, useMemo, useCallback } from 'react'
import { Wallpaper } from 'lucide-react'
import { fetchPayments, fetchPaymentDetail, debounce } from './utils'
import {Filters, PaymentTable, PaymentModal, Pagination, ErrorPage, Loader} from './components'
import './App.css'

function App() {

  const [payments, setPayments] = useState([])
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedPayment, setSelectedPayment] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  
  const [modalOpen, setModalOpen] = useState(false)
  
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'PaymentDate', direction: 'desc' })
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  
  const PAGE_SIZE = 10

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
      const { payments, pagination } = await fetchPayments(startDate, endDate)
      setPayments(payments);
      setTotalCount(pagination.totalCount || payments.length)
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

  // Paginated slice for current page
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return processedPayments.slice(start, start + PAGE_SIZE)
  }, [processedPayments, currentPage])

  const displayTotalPages = Math.ceil(processedPayments.length / PAGE_SIZE)

  const handleView = async (paymentId) => {
    setModalOpen(true)
    setLoadingDetail(true)
    try {
      const detail = await fetchPaymentDetail(paymentId)
      setSelectedPayment(detail)
      setModalOpen(true)
    } catch (err) {
      alert('Failed to load payment details: ' + err.message)
      setModalOpen(false)
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

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
              <div className="empty">
                <Wallpaper size={120}/>
                <p>No payments found for the selected period.</p>
              </div>
            ) : (
              <PaymentTable
                payments={paginatedPayments}
                onView={handleView}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            )}

            {totalCount > 0 && (
              <div className="total-count">
                Showing {(currentPage - 1) * 
                  PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, processedPayments.length)} of {processedPayments.length.toLocaleString()} payments
              </div>
            )}

            {/* Pagination Controls */}
              {displayTotalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={displayTotalPages}
                  onPageChange={setCurrentPage}
                />
              )}
          </>
        )}
      </div>
      
        <PaymentModal
          payment={selectedPayment}
          isOpen={modalOpen}
          loadingDetail={loadingDetail}
          onClose={closeModal}
        />
        
    </>
  )
}

export default App