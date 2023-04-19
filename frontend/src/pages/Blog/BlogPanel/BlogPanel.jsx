import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './BlogPanel.module.css'

import { createBlog } from '../../../services/blog'
import { useSelector } from 'react-redux'
import { getUser } from '../../../store/userSlice'

const BlogPanel = () => {
  const user = useSelector(getUser)
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState('')
  const [image, setImage] = useState()

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const clearMessage = () => {
    setTimeout(() => {
      setMessage('')
      setTitle('')
      setCategories('')
      setDescription('')
      setImage(null)
    }, 2000)
  }

  async function addBlog(e) {
    e.preventDefault()
    if (!categories || !description || !title || !image) {
      setMessage('Make sure all the field are filled')
      return clearMessage()
    }

    const formData = new FormData()

    formData.append('image', image)
    formData.append(
      'json',
      JSON.stringify({
        title,
        description,
        user: user._id,
        category: categories,
      })
    )
    const response = await createBlog(formData)
    console.log(response)

    if (response.status === 'success') {
      setMessage(response.message)
      clearMessage()
    }
  }
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        {message ? <h1>{message}</h1> : <h1>Write Blog</h1>}
      </div>

      <div className={styles.form}>
        <label
          className={styles.blogTitle}
          htmlFor="title"
        >
          <input
            placeholder="Blog Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <select
          onChange={(e) => setCategories(e.target.value.toLowerCase())}
          className={styles.categories}
        >
          <option>categories</option>
          <option value="Database">Database</option>
          <option value="Backend">Backend</option>
          <option value="frontend">Frontend</option>
          <option value="game development">Game Development</option>
        </select>
        <label className={styles.file}>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
          />
          <button className={styles.selectImg}>
            {image ? 'Image Selected' : 'Select Image'}
          </button>
        </label>
        <div className={styles.blogDescription}>
          <h2 className={styles.blogTitle}>Blog</h2>
          <ReactQuill
            className={styles.textarea}
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </div>
        <button
          className={styles.button}
          onClick={(e) => addBlog(e)}
        >
          {message ? <p>{message}</p> : <p> Add Blog</p>}
        </button>
      </div>
    </main>
  )
}

export default BlogPanel
