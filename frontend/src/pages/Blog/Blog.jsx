import React, { useEffect, useState } from 'react'
import styles from './Blog.module.css'
import Articles from './Articles'
import { HiPlusCircle } from 'react-icons/hi'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
// import parser from 'html-react-parser'
import { useDispatch } from 'react-redux'
import { allBlogs } from '../../store/blogSlice'

const Blog = () => {
  const { search } = useLocation()
  const dispatch = useDispatch()
  const [changeQuery, setChangeQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [count, setCount] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const params = new URLSearchParams(search)
    const category = params.get('category')
    const page = params.get('page')

    setChangeQuery(category)
    if (page !== null) setCurrentPage(page)

    dispatch(allBlogs(search)).then((response) => {
      if (response.payload.count / 9 === 1) return setCount(null)
      setCount(response.payload.count)
    })
  }, [search, dispatch])

  async function handleOptionChange(event) {
    const selectedValue = event.target.value
    if (selectedValue === '') {
      setSearchParams()
    } else {
      setSearchParams({ page: 1, category: selectedValue })
    }
  }

  const paginationHandler = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(search)
    const category = params.get('category')
    const page = e.target.value * 1 + 1
    if (category !== null) return setSearchParams({ category, page })
    setSearchParams({ page })
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
          <div className={styles.categoriesContainer}>
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
            <Link to={'/blog_panel'}>
              <span>Write Blog</span>
              <HiPlusCircle size={34} />
            </Link>
          </div>

          <Articles />
          {count && (
            <div className={styles.pagination}>
              {Array(Math.ceil(count / 9))
                .fill(null)
                .map((el, index) => (
                  <button
                    onClick={(e) => paginationHandler(e)}
                    value={index}
                    key={index}
                    className={`${styles.pageBtn} ${
                      currentPage * 1 === index + 1 && `${styles.active}`
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Blog
