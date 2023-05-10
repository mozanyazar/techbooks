import React, { useState } from 'react'
import styles from './Product.module.css'
import { createReview } from '../../../services/review'
import ReactStars from 'react-rating-stars-component'
import formatDate from '../../../utils/dateFormatter'

const Reviews = ({ review, data, getBook }) => {
  const [text, setText] = useState()
  const [rate, setRate] = useState(null)
  const [message, setMessage] = useState('')

  async function reviewHandler(e) {
    e.preventDefault()
    if (text.trim() === 0) return setMessage('please leave a comment')
    if (!rate) return setMessage('please choose a rate')
    const response = await createReview({
      product: data._id,
      review: text,
      rating: rate,
    })
    console.log(response)
    if (response.status === 'success') {
      setText('')
      setRate(0)
      getBook()
    } else if (response.status === 'fail') {
      return setMessage(response.message)
    }
  }

  return (
    <div className={styles.reviewContainer}>
      {message && <p className={styles.message}>{message}</p>}
      <form
        onSubmit={reviewHandler}
        className={styles.reviewForm}
      >
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a review"
          className={styles.textArea}
        ></textarea>
        <ReactStars
          value={rate}
          count={5}
          onChange={(event) => setRate(event)}
          size={24}
          activeColor="#ffd700"
        />
        <button className={styles.submitBtn}>Submit</button>
      </form>
      {review?.map((review) => {
        return (
          <div
            className={styles.singleReview}
            key={review._id}
          >
            <div className={styles.leftPp}>
              <img
                src={`https://techbook-react-express.onrender.com//${review.user.photo}`}
                alt={review.user.name}
              />
              <span>{review.user.name}</span>
            </div>
            <div className={styles.rightText}>
              <p className={styles.reviewText}>{review.review}</p>
              <div className={styles.reviewRate}>
                <ReactStars
                  edit={false}
                  value={review.rating}
                  count={5}
                />
              </div>
              <span className={styles.reviewDate}>
                {formatDate(review.createdAt, 'DD-MM-YYYY hh:mm')}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
