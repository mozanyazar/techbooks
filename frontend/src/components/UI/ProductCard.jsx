import React, { useState } from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import { updateUserBasket } from '../../store/basketSlice'
import { useDispatch } from 'react-redux'
import BasketLoading from '../../Loading/BasketLoading'

const ProductCard = ({
  title,
  description,
  price,
  pages,
  image,
  category,
  ratingsAverage,
  ratingsQuantity,
  slug,
  _id,
}) => {
  const dispatch = useDispatch()
  const [click, setClick] = useState(false)

  const addToCart = (e) => {
    e.preventDefault()
    setClick(true)
    const items = {
      title,
      description,
      price,
      pages,
      image,
      category,
      ratingsAverage,
      ratingsQuantity,
      slug,
    }
    dispatch(updateUserBasket(items)).then((res) => setClick(false))
  }
  return (
    <Link
      to={`${slug}`}
      className={styles.container}
    >
      <div className={styles.image}>
        <img
          src={`http://localhost:3001/${image}`}
          alt={title}
        />
      </div>
      <div className={styles.productDetail}>
        <div className={styles.title}>
          <h4>{title}</h4>
          <span>${price}</span>
          <p>{description}</p>
        </div>
        <div className={styles.cardBottom}>
          <p> pages: {pages}</p>
          {click ? (
            <button className={styles.addCard}>
              <BasketLoading />
            </button>
          ) : (
            <button
              onClick={addToCart}
              className={styles.addCard}
            >
              Add to Card
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
