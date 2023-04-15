import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { login } from '../../store/userSlice'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../services/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userForgotPassword, setUserForgotPassword] = useState(false)
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login({ email, password }))
    setPassword('')
    setEmail('')
  }

  async function forgotHandler(e) {
    e.preventDefault()
    try {
      const response = await forgotPassword({ email })
      console.log(response)
    } catch (error) {}
    setEmail('')
  }
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        {!userForgotPassword ? <h1>Login</h1> : <h1>Forgot Password</h1>}
      </div>
      <div className={styles.formContainer}>
        {!userForgotPassword ? (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={styles.form}
          >
            <label htmlFor="email">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
              />
            </label>{' '}
            <label htmlFor="password">
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="email"
                type="password"
                className={`${
                  password && password.length < 6 && `${styles.errorForm}`
                }`}
              />
              {password && password.length < 6 && (
                <p className={styles.error}>
                  Your password must be at least 6 characters long
                </p>
              )}
            </label>{' '}
            <div>
              <button
                disabled={password && password.length < 6}
                type="submit"
                className={styles.button}
              >
                Login
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  setEmail('')
                  setPassword('')
                  setUserForgotPassword(true)
                }}
              >
                Forgot Password
              </button>
            </div>
            <p className={styles.link}>
              You do not have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        ) : (
          <form
            onSubmit={(e) => forgotHandler(e)}
            className={`${styles.form} ${styles.forgotForm}`}
          >
            <label htmlFor="email">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
              />
            </label>{' '}
            <button
              type="submit"
              className={styles.button}
            >
              Send mail
            </button>
            <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault()
                setEmail('')
                setPassword('')
                setUserForgotPassword(false)
              }}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default Login
