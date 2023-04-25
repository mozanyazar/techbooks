import React from 'react'
import styles from './HomeFiftRow.module.css'
import ArticleCard from '../../../components/UI/ArticleCard'
const HomeFiftRow = ({ blogs }) => {
  return (
    <section className={styles.latestContainer}>
      <div className={styles.innerContainer}>
        <h5 className={styles.latestTitle}>Latest Articles</h5>
        <div className={styles.cardsWrapper}>
          {blogs.map((blog) => {
            return (
              <ArticleCard
                key={blog._id}
                {...blog}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeFiftRow
