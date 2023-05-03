import React from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'

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
}) => {
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
          <button className={styles.addCard}>Add to Card</button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
