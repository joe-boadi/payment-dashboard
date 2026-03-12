import PropTypes from "prop-types"

export function ErrorPage({error}) {
  return (
    <section className="error-page">
      <h2 className='error-heading'>Oops, an error occurred</h2>
      <p className='error-title'> Error: {error}</p>
      <div className="error-image-container">
        <img src="/assets/images/No-data-pana-1.png" alt="A fetch error" className="error-image"/>
      </div>
      <p className='error_sub_info'>Check the internet connection and try again later</p>
    </section>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.string,
}