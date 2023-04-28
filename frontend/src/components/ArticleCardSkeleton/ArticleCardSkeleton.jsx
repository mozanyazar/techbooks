import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styles from './ArticleCardSkeleton.module.css'

const ArticleCardSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#ededed"
      highlightColor="#3333"
    >
      <div className={styles.skeleton}>
        <div>
          <Skeleton className={styles.image} />
          <div className={styles.titleContainer}>
            <Skeleton
              className={styles.title}
              count={2}
            />
          </div>
          <div className={styles.descContainer}>
            <Skeleton
              className={styles.desc}
              count={3}
            />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default ArticleCardSkeleton
