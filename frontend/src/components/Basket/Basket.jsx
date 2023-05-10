import React, { useEffect, useState } from 'react'
import styles from './Basket.module.css'
import { useSelector } from 'react-redux'
import { basket, getBasketStatus } from '../../store/basketSlice'
import BasketCard from './BasketCard'

const Basket = ({ basketOpenAndClose, basketToggle }) => {
  const userBasket = useSelector(basket)
  const basketStatus = useSelector(getBasketStatus)

  return (
    <React.Fragment>
      <div
        onClick={basketToggle}
        className={styles.basketOverlay}
      ></div>
      {userBasket.items.length === 0 ? (
        <button
          className={styles.empty}
          onClick={basketToggle}
        >
          Your cart is empty
          <span>x</span>
        </button>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Your Cart</h2>
            <button onClick={basketToggle}>X</button>
          </div>
          {basketStatus === 'succeeded' && (
            <div className={styles.products}>
              {userBasket?.items?.map((product, index) => {
                return (
                  <BasketCard
                    basketToggle={basketToggle}
                    key={index}
                    {...product}
                  />
                )
              })}
            </div>
          )}
          <div className={styles.total}>
            <div className={styles.topTotal}>
              <p>Total Price</p>
              <span>${userBasket?.totalPrice}</span>
            </div>
            <button className={styles.continue}>Continue to checkout</button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default Basket
