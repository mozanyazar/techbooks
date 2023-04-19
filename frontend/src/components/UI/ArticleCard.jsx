import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/dateFormatter'
import styles from './ArticleCard.module.css'
import parse from 'html-react-parser'
const ArticleCard = ({ createdAt, description, image, title, user }) => {
  return (
    <Link className={styles.card}>
      <img
        className={styles.cardImage}
        src={`http://localhost:3001/${image}`}
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
