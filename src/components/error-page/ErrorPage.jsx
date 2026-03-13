import PropTypes from 'prop-types';
import { Bug } from 'lucide-react';
import styles from './ErrorPage.module.css';
export function ErrorPage({ error }) {
  return (
    <section>
      <h2 className={styles.errorHeading}>Oops, an error occurred</h2>
      <p className={styles.errorTitle}> Error: {error}</p>
      <div className={styles.errorImageContainer} title="A bug image">
        <Bug size={120} />
      </div>
      <p className={styles.errorSubInfo}>Check the internet connection and try again later</p>
    </section>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string,
};
