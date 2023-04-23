import React from 'react'
import styles from './HomeFourthRow.module.css'
import img1 from '../../../images/Photo.png'
import img2 from '../../../images/what-is-a-web-developer.jpg'

import { Link } from 'react-router-dom'

const HomeFourthRow = () => {
  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <div className={styles.topInner}>
          <div className={styles.topLeft}>
            <h4 className={styles.topTitle}>Read Article About Tech</h4>
            <p className={styles.topText}>
              This the first true value generator on the Internet. It uses
              alphas dictionary of over 200 Latin words.
            </p>
            <Link
              className={styles.topButton}
              to="/blog"
            >
              Read Now
            </Link>
          </div>
          <div className={styles.topRight}>
            <img
              src={img1}
              alt="learn today"
            />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <h5 className={styles.bottomTitle}>What will you learn?</h5>
          <div className={styles.bottomContent}>
            <div className={styles.bottomLeft}>
              <div className={styles.box}>
                <div>01</div>
                <p>
                  Use HDFS & Map Reduce for storing & analyzing data at scale.
                </p>
              </div>
              <div className={styles.box}>
                <div>02</div>
                <p>
                  Consume streaming data using Spark Streaming, Flink, and
                  Storm.
                </p>
              </div>
              <div className={styles.box}>
                <div>03</div>
                <p>
                  Choose an appropriate data storage technology for your
                  application
                </p>
              </div>
              <div className={styles.box}>
                <div>04</div>
                <p>
                  Analyze non-relational data using HBase, Cassandra, and
                  MongoDB.
                </p>
              </div>
            </div>
            <div className={styles.bottomRight}>
              <img
                src={img2}
                alt="learn today"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFourthRow
