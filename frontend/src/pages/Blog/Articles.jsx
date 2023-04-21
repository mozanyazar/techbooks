import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { getBlogs, getBlogsStatus } from '../../store/blogSlice'
import ArticleCard from '../../components/UI/ArticleCard'
import styles from './Blog.module.css'
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton/ArticleCardSkeleton'

const Articles = () => {
  const blogs = useSelector(getBlogs)
  const blogsStatus = useSelector(getBlogsStatus)
  const [loading, setLoading] = useState(false)

  const clearSkeleton = () => {
    setTimeout(() => {
      setLoading(true)
    }, 1250)
  }

  useEffect(() => {
    if (blogsStatus === 'succeeded' && blogs.length > 0) {
      return clearSkeleton()
    }
    setLoading(false)
  }, [blogsStatus])

  return (
    <div className={styles.CardsWrapper}>
      {!loading &&
        Array(9)
          .fill(null)
          .map((loading, index) => {
            return <ArticleCardSkeleton key={index} />
          })}
      {loading &&
        blogs?.map((blog) => {
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
