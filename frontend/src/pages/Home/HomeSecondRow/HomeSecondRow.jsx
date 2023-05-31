import React, { useState } from 'react'
import styles from './HomeSecondRow.module.css'
import image from '../../../images/firstBook.png'
import { useNavigate } from 'react-router-dom'

const HomeSecondRow = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([
    {
      title: "Atomic's One",
      desciption:
        'Many variations of passages of Lorem Ipsum willing araise  alteration in some form.',
      pages: '499',
    },
    {
      title: 'The Light Dark',
      desciption:
        'Many variations of passages of Lorem Ipsum willing araise  alteration in some form.',
      pages: '395',
    },
  ])

  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <h3 className={styles.title}>Best Sellers in 2022</h3>
        <div className={styles.booksWrapper}>
          {data.map((book, index) => {
            return (
              <div
                className={styles.bookContainer}
                key={index}
              >
                <img
                  width={300}
                  height={400}
                  src={image}
                  alt="placeholder"
                />
                <div className={styles.bookInfo}>
                  <h5 className={styles.bookTitle}>{book.title}</h5>
                  <p className={styles.bookDesc}>{book.desciption}</p>
                  <div className={styles.bookPages}>
                    <b></b>
                    <p>
                      Pages: <br /> <span>{book.pages}</span>
                    </p>
                  </div>
                  <button
                    className={styles.orderButton}
                    onClick={() => navigate('/products')}
                  >
                    Order Today
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeSecondRow
