import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { getUserError, login } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../services/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const err = useSelector(getUserError)

  // switch the forms (login || forgotpassword)
  const [userForgotPassword, setUserForgotPassword] = useState(false)

  // fotget password message state
  const [resetMessage, setResetMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // login
  async function handleSubmit(e) {
    e.preventDefault()
    const res = await dispatch(login({ email, password }))

    // set input emty
    setPassword('')
    setEmail('')

    // if success navigate to homepage
    if (res.payload.status === 'success') {
      navigate('/')
    }
  }

  // forgot password
  async function forgotHandler(e) {
    e.preventDefault()
    try {
      const response = await forgotPassword({ email })
      setResetMessage(response.message)

      if (response.status === 'success') {
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
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
            <label>
              {!email && err && <p className={styles.error}>{err}</p>}
            </label>
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
            {!email && resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
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
