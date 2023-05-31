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
            I have been working as a frontend developer at "Educational
            Networks," a company based in the United States, for over a year.
            Within the scope of my work, I have been completed in 55 projects.
            <br />
            <span>
              This website does not have any commercial purpose and the design
              belongs to Victor Flow. I made some changes.{' '}
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
