import React from 'react'
import Lottie from 'lottie-react'
import animation from './animation.json'
import styles from './Loading.module.css'
const Loading = () => {
  return (
    <div className={styles.container}>
      <Lottie
        animationData={animation}
        loop={true}
      />
    </div>
  )
}

export default Loading
