import React, { useEffect, useState } from 'react'
import styles from './FilterPopup.module.css'
import { FaWindowClose } from 'react-icons/fa'
import { useLocation, useSearchParams } from 'react-router-dom'

const FilterPopup = ({ setPopup, animation, setAnimation }) => {
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(null) // not selected
  const [sort, setSort] = useState(null) // newest default(ratingsAverage || price)

  useEffect(() => {
    const params = new URLSearchParams(search)
    const category = params.get('category')
    const sort = params.get('sort')
    setCategory(category)
    setSort(sort)
  }, [searchParams, search])

  function filterHandler(e) {
    e.preventDefault()
    setPopup(false)
    if (!sort && !category) return setSearchParams({})
    else if (!category) return setSearchParams({ sort, page: 1 })
    else if (!sort) return setSearchParams({ category, page: 1 })
    return setSearchParams({ category, sort, page: 1 })
  }

  const changeCategory = (currentCategory) => {
    if (currentCategory === 'all') return setCategory(null)
    setCategory(currentCategory)
  }

  return (
    <>
      <div
        onClick={() => setPopup(false)}
        className={styles.popupBg}
      ></div>
      <div className={`${styles.popup} ${animation && `${styles.active}`}`}>
        <div className={styles.headerPopup}>
          <span className={styles.popupTitle}>Filter</span>
          <button onClick={() => setPopup(false)}>
            {' '}
            <FaWindowClose
              size={30}
              color="#1b3764"
            />
          </button>
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.selectCategory}>
            <p>Select Category</p>
            <div className={styles.innerButtons}>
              <button
                onClick={() => changeCategory(null)}
                className={`${category === null ? `${styles.active}` : null}`}
              >
                All Books
              </button>

              <button
                value="backend"
                onClick={(e) => changeCategory(e.target.value)}
                className={`${
                  category === 'backend' ? `${styles.active}` : null
                }`}
              >
                Backend
              </button>
              <button
                value="frontend"
                onClick={(e) => changeCategory(e.target.value)}
                className={`${
                  category === 'frontend' ? `${styles.active}` : null
                }`}
              >
                Frontend
              </button>

              <button
                value="database"
                onClick={(e) => changeCategory(e.target.value)}
                className={`${
                  category === 'database' ? `${styles.active}` : null
                }`}
              >
                Database
              </button>
              <button
                value="game development"
                onClick={(e) => changeCategory(e.target.value)}
                className={`${
                  category === 'game development' ? `${styles.active}` : null
                }`}
              >
                Game Development
              </button>
            </div>
          </div>
          <div className={styles.selectSort}>
            <p>Sort By</p>
            <div className={styles.innerButtons}>
              <button
                className={`${sort === null ? `${styles.active}` : null}`}
                onClick={(e) => setSort(null)}
              >
                Newest
              </button>
              <button
                className={`${sort === 'price' ? `${styles.active}` : null}`}
                onClick={(e) => setSort('price')}
              >
                low to high
              </button>
              <button
                className={`${sort === '-price' ? `${styles.active}` : null}`}
                onClick={(e) => setSort('-price')}
              >
                high to low
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => filterHandler(e)}
          className={styles.filterButton}
        >
          Filter
        </button>
      </div>
    </>
  )
}

export default FilterPopup
