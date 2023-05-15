import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'
import notfound from '../../images/404.png'
const NotFound = () => {
  return (
    <main className={styles.container}>
      <div className={styles.pageError}>Page Error</div>
      <div className={styles.mainContent}>
        <img
          src={notfound}
          alt="404"
        />
        <p>Page not Found!!!</p>
        <span>
          The page you are looking for doesn't exist. Please try searching for
          some other page, or return to the website's homepage to find what
          you're looking for.
        </span>
        <Link to="/">Back to Home</Link>
      </div>
    </main>
  )
}

export default NotFound
