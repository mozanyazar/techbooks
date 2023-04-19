import React, { useEffect, useState } from 'react'
import styles from './Blog.module.css'
import Articles from './Articles'
import { useLocation, useSearchParams } from 'react-router-dom'
// import parser from 'html-react-parser'
import { useDispatch } from 'react-redux'
import { allBlogs } from '../../store/blogSlice'

const Blog = () => {
  const { search } = useLocation()
  const dispatch = useDispatch()
  const [changeQuery, setChangeQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const category = params.get('category')
    setChangeQuery(category)
    dispatch(allBlogs(search))
  }, [search, dispatch])

  async function handleOptionChange(event) {
    const selectedValue = event.target.value
    if (selectedValue === '') {
      setSearchParams()
    } else {
      setSearchParams({ category: selectedValue })
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <h1>Blog</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, have{' '}
          <br />
          suffered alteration in some form.
        </p>
      </div>

      <section className={styles.blogsWrapper}>
        <div className={styles.blogsInner}>
          <div className={styles.categories}>
            <select
              value={changeQuery || ''}
              onChange={(e) => handleOptionChange(e)}
            >
              <option value="">All Articles</option>
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
              <option value="database">Database</option>
              <option value="game development">Game Development</option>
            </select>
          </div>

          <Articles />
        </div>
      </section>
    </main>
  )
}

export default Blog
