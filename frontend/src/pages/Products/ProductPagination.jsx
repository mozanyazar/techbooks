import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import { allProducts, getProductsStatus } from '../../store/productSlice'
import styles from './Products.module.css'
const ProductPagination = () => {
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const productsStatus = useSelector(getProductsStatus)
  const dispatch = useDispatch()
  const [count, setCount] = useState()
  const [results, setResults] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const params = new URLSearchParams(search)
    const page = params.get('page')
    if (page) {
      setCurrentPage(page)
    }

    dispatch(allProducts(search)).then((res) => {
      setResults(res.payload.results)
      setCount(res.payload.count)
    })
  }, [search, dispatch, currentPage])

  return (
    <>
      {count && (results > 4 || currentPage > 1) && (
        <div className={styles.buttonContainer}>
          {Array(Math.ceil(count / 6))
            .fill(null)
            .map((el, index) => (
              <button
                onClick={(e) => {
                  setSearchParams({ page: index + 1 })
                }}
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
    </>
  )
}

export default ProductPagination
