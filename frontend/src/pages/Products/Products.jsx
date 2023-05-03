import React, { useMemo, useState } from 'react'
import styles from './Products.module.css'
import { useSelector } from 'react-redux'
import { BsFilterRight } from 'react-icons/bs'
import Loading from '../../Loading/Loading'
import ProductContainer from './ProductContainer'
import ProductPagination from './ProductPagination'
import { getProductsStatus } from '../../store/productSlice'
import FilterPopup from './FilterPopup/FilterPopup'
const Products = () => {
  const productsStatus = useSelector(getProductsStatus)
  const [popup, setPopup] = useState(false)
  const [animation, setAnimation] = useState(false)

  useMemo(() => {
    if (popup === false) return setAnimation(false)
  }, [popup])

  return (
    <main className={styles.container}>
      {popup && (
        <FilterPopup
          animation={animation}
          setAnimation={setAnimation}
          setPopup={setPopup}
        />
      )}
      <div className={styles.title}>
        <h1>My Store</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, have
          suffered alteration in some form.
        </p>
      </div>

      <section className={styles.mainSection}>
        <div className={styles.filter}>
          <button
            onClick={() => {
              setPopup(true)
              setTimeout(() => {
                setAnimation(true)
              }, 100)
            }}
          >
            <span>Filter</span> <BsFilterRight size={32} />
          </button>
        </div>

        <div className={styles.productsContainer}>
          <ProductContainer />
        </div>
        <ProductPagination />
      </section>
    </main>
  )
}

export default Products
