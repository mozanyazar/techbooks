import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { allBlogs, getBlogs, getBlogsStatus } from '../../store/blogSlice'
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
