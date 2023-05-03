import React, { useEffect, useState } from 'react'
import styles from './Product.module.css'
import { useLocation } from 'react-router-dom'
import { getProduct } from '../../../services/products'
import Skeleton from 'react-loading-skeleton'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import img1 from '../../../images/22.svg'
import img2 from '../../../images/Icon.svg'
import img3 from '../../../images/22.png'
import Reviews from './Reviews'

const Product = () => {
  const { pathname } = useLocation()
  const [data, setData] = useState()
  const [review, setReview] = useState()
  const [loading, setLoading] = useState(true)

  const getBook = async () => {
    const response = await getProduct(pathname)
    if (response.status === 'success') {
      setData(response.data[0])
      setReview(response.data[0].review)
      setTimeout(() => {
        setLoading(false)
      }, 900)
    }
  }

  useEffect(() => {
    getBook()
  }, [])

  return (
    <main>
      <div className={styles.title}>{data && <h1>{data.title}</h1>}</div>

      {data && (
        <section className={styles.innerContainer}>
          <div className={styles.product}>
            <div className={styles.left}>
              <img
                src={`http://localhost:3001/${data.image}`}
                alt={data.title}
              />
            </div>
            <div className={styles.right}>
              <h2 className={styles.rightTitle}>{data.title}</h2>
              <span className={styles.price}>${data.price}</span>
              <p className={styles.desc}>
                <span
                  style={{ color: 'rgba(28 55 100,.7)', fontWeight: '700' }}
                >
                  Description
                </span>
                : <br />
                {data.description}
              </p>
              <ul className={styles.listContainer}>
                <li className={styles.listItem}>
                  <p>
                    Author <b>:</b>
                  </p>
                  placeholder
                </li>
                <li className={styles.listItem}>
                  <p>
                    Pages <b>:</b>
                  </p>
                  {data.pages}
                </li>
                <li className={styles.listItem}>
                  <p>
                    Language <b>:</b>
                  </p>
                  English
                </li>
                <li className={styles.listItem}>
                  <p>
                    Dimensions <b>:</b>
                  </p>
                  20 x 14 x 4 cm
                </li>
              </ul>
              <button className={styles.addCart}>
                <AiOutlineShoppingCart
                  size={22}
                  style={{ position: 'relative', right: '4px' }}
                />{' '}
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {review && (
        <Reviews
          getBook={getBook}
          setReview={setReview}
          review={review}
          data={data}
        />
      )}

      <div className={styles.yellowArea}>
        <div className={styles.yellowBox}>
          <div className={styles.yellowImg}>
            <img
              src={img1}
              alt="vektor 1"
            />
          </div>
          <p className={styles.yellowTitle}>Secure Payments</p>
          <span className={styles.yellowText}>
            {' '}
            There are many variations of passages of alteration in some form.
          </span>
        </div>
        <div className={styles.yellowBox}>
          <div className={styles.yellowImg}>
            <img
              src={img2}
              alt="vektor 1"
            />
          </div>
          <p className={styles.yellowTitle}>Free Shipping</p>
          <span className={styles.yellowText}>
            {' '}
            There are many variations of passages of alteration in some form.
          </span>
        </div>
        <div className={styles.yellowBox}>
          <div className={styles.yellowImg}>
            <img
              src={img3}
              alt="vektor 1"
            />
          </div>
          <p className={styles.yellowTitle}>100% Satisfactions</p>
          <span className={styles.yellowText}>
            {' '}
            There are many variations of passages of alteration in some form.
          </span>
        </div>
      </div>
    </main>
  )
}

export default Product
