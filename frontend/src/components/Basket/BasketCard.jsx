import React, { useState } from 'react'
import styles from './Basket.module.css'
import { removeItemFromBasket } from '../../store/basketSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const BasketCard = ({ title, price, quantity, image, slug, basketToggle }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [itemQuantity, setItemQuantity] = useState(quantity)

  const removeItem = async (event) => {
    event.preventDefault()
    dispatch(removeItemFromBasket({ title }))
  }

  return (
    <div className={styles.product}>
      <div className={styles.productImg}>
        <img
          src={`https://techbooks-production.up.railway.app/${image}`}
          alt={title}
        />
        <div className={styles.titleGroup}>
          <Link
            onClick={(e) => {
              basketToggle(e)
              navigate(`/products/${slug}`)
            }}
          >
            <p>{title}</p>
          </Link>
          <span>
            ${price} x {quantity} = ${price * quantity}
          </span>
          <button onClick={removeItem}>Remove</button>
        </div>
      </div>
      <div className={styles.productRight}>
        <input
          disabled
          min="1"
          type="number"
          value={itemQuantity || 1}
          onChange={(event) => setItemQuantity(event.target.value)}
        />
      </div>
    </div>
  )
}

export default BasketCard
