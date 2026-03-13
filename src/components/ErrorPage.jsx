import PropTypes from "prop-types"
import { Bug } from "lucide-react"
export function ErrorPage({error}) {
  return (
    <section className="error-page">
      <h2 className='error-heading'>Oops, an error occurred</h2>
      <p className='error-title'> Error: {error}</p>
      <div className="error-image-container" title="A bug image">
        {/* <img src="/assets/images/No-data-pana-1.png" alt="A fetch error" className="error-image"/> */}
        <Bug size={120}/>
      </div>
      <p className='error_sub_info'>Check the internet connection and try again later</p>
    </section>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.string,
}