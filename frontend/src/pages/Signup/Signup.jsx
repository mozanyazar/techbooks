import React, { useState } from 'react'
import styles from './Signup.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { createUserThunk, getUserError } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSelect } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const error = useSelector(getUserError)
  const [img, setImg] = useState(null)
  const [imgPreview, setImagePreview] = useState('')

  const formSubmit = async (values, actions) => {
    actions.resetForm()

    const formData = new FormData()

    formData.append('image', img)
    formData.append(
      'json',
      JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      })
    )

    // create user and get token from backend as a cookie
    dispatch(createUserThunk(formData)).then((e) => {
      if (e.payload.status === 'error') {
        return
      } else {
        navigate('/')
      }
    })
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, 'Your password must be at least 6 characters long.')
      .required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  })

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: formSubmit,
    validationSchema: validationSchema,
  })
  const handleFileInputChange = (event) => {
    setImg(event.target.files[0])
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <h1>Signup</h1>
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <label>
            {!values.name && error && <p className={styles.error}>{error}</p>}
          </label>
          <label
            htmlFor="image"
            className={styles.choosePhoto}
          >
            <input
              type="file"
              onChange={handleFileInputChange}
              accept=".png, .jpg, .jpeg, .webp"
            />
            {imgPreview ? (
              <img
                style={{ maxWidth: '100%' }}
                src={imgPreview}
                alt="place"
              />
            ) : (
              <>
                <AiOutlineSelect className={styles.selectIcon} />
                <FaUserCircle
                  size={100}
                  color="rgb(27 56 100)"
                />
              </>
            )}
          </label>
          <label htmlFor="name">
            Name
            <input
              onChange={handleChange}
              value={values.name}
              name="name"
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              onChange={handleChange}
              value={values.email}
              name="email"
              type="email"
            />
          </label>{' '}
          <label htmlFor="password">
            Password
            <input
              onChange={handleChange}
              value={values.password}
              name="password"
              type="password"
              className={`${
                values.password && errors.password && `${styles.errorForm}`
              } `}
            />
            {values.password && errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </label>
          <label htmlFor="password">
            Password Confirm
            <input
              onChange={handleChange}
              value={values.passwordConfirm}
              name="passwordConfirm"
              type="password"
              className={`${
                values.passwordConfirm &&
                errors.passwordConfirm &&
                `${styles.errorForm}`
              } `}
            />
            {values.passwordConfirm && errors.passwordConfirm && (
              <p className={styles.error}>{errors.passwordConfirm}</p>
            )}
          </label>
          <button
            type="submit"
            className={styles.button}
          >
            Signup
          </button>
          <p className={styles.link}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Signup
