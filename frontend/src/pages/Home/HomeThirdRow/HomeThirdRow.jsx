import React from 'react'
import styles from './HomeThirdRow.module.css'

import pp from '../../../images/pp.jpeg'
import { Link } from 'react-router-dom'
export const HomeThirdRow = () => {
  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.leftItem}>
          <img
            src={pp}
            alt="profile"
          />
        </div>
        <div className={styles.rightItem}>
          <h5 className={styles.title}>About Me</h5>
          <p className={styles.desc}>
            Hello, I'm Mahmut Ozan Yazar. I am a passionate front-end developer
            from Turkey. <br />
            For about a year, I've been providing front-end, UI, and UX support
            to a company called "Educational Networks". <br />
            <span>
              This website does not have any commercial purpose and the design
              belongs to Web Flow. I made some changes.{' '}
              <Link
                target="_blank"
                to="https://www.figma.com/community/file/1187662275043405075"
              >
                Click here
              </Link>{' '}
              to access the company's design.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
