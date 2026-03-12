import PropTypes from "prop-types"

export function ErrorPage({error}) {
  return (
    <section>
      <h2 className='error-heading'>Oops, an error occurred</h2>
      <p className='error-title'>Failed to load payment data, {error}</p>
      <div>
        <img src="/assets/images/error-page.jpg" alt="A fetch error" className='error-image'/>
      </div>
      <p className='error_sub_info'>Check the internet connect and try again later</p>
    </section>
  )
}
ErrorPage.propTypes = {
  error: PropTypes.string,
}