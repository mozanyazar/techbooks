import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/dateFormatter'
import styles from './ArticleCard.module.css'
import parse from 'html-react-parser'
const ArticleCard = ({ createdAt, description, image, title, user, _id }) => {
  return (
    <Link
      className={styles.card}
      to={`/blog/${_id}`}
    >
      <img
        className={styles.cardImage}
        src={`https://techbook-react-express.onrender.com/${image}`}
        alt=""
      />

      <div className={styles.cardArticle}>
        <h4 className={styles.title}>{title}</h4>
        {
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: parse(description),
            }}
          ></div>
        }
      </div>
      <div className={styles.date}>
        <p>Author: {user.name}</p>
        <span> {formatDate(createdAt, 'DD-MM-YYYY hh:mm')} </span>
      </div>
    </Link>
  )
}

export default ArticleCard
