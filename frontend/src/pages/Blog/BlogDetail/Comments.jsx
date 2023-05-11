import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import formatDate from '../../../utils/dateFormatter'
import styles from './BlogDetail.module.css'
import { useSelector } from 'react-redux'
import { getUser } from '../../../store/userSlice'
import { createComment } from '../../../services/comment'
import { Link } from 'react-router-dom'

const Comments = ({ data }) => {
  const user = useSelector(getUser)
  const [comment, setComment] = useState('')
  const [toggle, setToggle] = useState(false)
  const [message, setMessage] = useState('')

  const clearStates = () =>
    setTimeout(() => {
      setMessage('')
      setComment('')
    }, 1500)

  async function sendComment(e) {
    e.preventDefault()

    const newComment = { comment, blog: data._id }

    if (!comment) {
      setMessage('Comment can not be empty !')
      return clearStates()
    }

    const response = await createComment(newComment)
    if (response.status === 'success') {
      setToggle(false)
      setMessage(response.message)
      setComment('')
      clearStates()
    }
  }
  return (
    <div className={styles.commentsWrapper}>
      <div className={styles.titleContainer}>
        {user.length !== 0 ? (
          <button
            onClick={() => setToggle(!toggle)}
            className={styles.leaveComment}
          >
            Leave a Comment
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              fontSize: '14.5px',
              width: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className={styles.leaveComment}
          >
            Login for leave a comment
          </Link>
        )}
        <h2 className={styles.commentTitle}>Comments</h2>
      </div>
      {message && <p>{message}</p>}
      <form
        onSubmit={sendComment}
        className={`${styles.commentForm} ${toggle && `${styles.active}`}`}
      >
        <textarea
          onChange={(e) => setComment(e.target.value)}
          placeholder="leave a comment"
        />
        <button type="submit">Submit</button>
      </form>
      {data.comments?.map((el) => {
        return (
          <div
            className={styles.singleComment}
            key={el._id}
          >
            <div className={styles.commentLeft}>
              <div className={styles.userImg}>
                {!el.user.photo ? (
                  <FaUserCircle />
                ) : (
                  <img
                    src={`https://techbooks-production.up.railway.app/${el.user.photo}`}
                    alt={el.user.name}
                  />
                )}
              </div>
              <div className={styles.userName}>{el.user.name}</div>
            </div>

            <div className={styles.comment}>
              <p>{el.comment}</p>
              <span className={styles.commentDate}>
                {formatDate(el.createdAt, 'DD-MM-YYYY hh:mm')}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Comments
