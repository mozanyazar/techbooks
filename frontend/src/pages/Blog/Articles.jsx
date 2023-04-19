import React from 'react'

import { useSelector } from 'react-redux'
import { getBlogs } from '../../store/blogSlice'
import ArticleCard from '../../components/UI/ArticleCard'
import styles from './Blog.module.css'

const Articles = () => {
  const blogs = useSelector(getBlogs)

  return (
    <div className={styles.CardsWrapper}>
      {blogs?.map((blog) => {
        return (
          <ArticleCard
            key={blog._id}
            {...blog}
          />
        )
      })}
    </div>
  )
}

export default Articles
