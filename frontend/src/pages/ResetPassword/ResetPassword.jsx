import React, { useState } from 'react'
import styles from './ResetPassword.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userPasswordReset } from '../../store/userSlice'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  const { token } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== passwordConfirm) return setError('passwords do not match!')

    const obj = {
      password,
      passwordConfirm,
      token,
    }

    dispatch(userPasswordReset(obj)).then(() => navigate('/'))
  }

  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <h1>New Password</h1>
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <label htmlFor="password">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </label>
          <label htmlFor="passwordConfirm">
            Password Confirm
            <input
              className={`${error && `${styles.errorForm}`} `}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              name="passwordConfirm"
              type="password"
            />
            <p className={styles.error}>{error}</p>
          </label>
          <button
            type="submit"
            className={styles.button}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}

export default ResetPassword
