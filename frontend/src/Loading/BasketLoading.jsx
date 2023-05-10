import React from 'react'
import Lottie from 'lottie-react'
import animation from './Basket.json'
import styles from './Loading.module.css'
const BasketLoading = () => {
  return (
    <div className={styles.basketContainer}>
      <Lottie
        animationData={animation}
        loop={true}
      />
    </div>
  )
}

export default BasketLoading
