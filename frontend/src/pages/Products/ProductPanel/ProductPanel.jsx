import React, { useState } from 'react'
import styles from './ProductPanel.module.css'
import { AiOutlineSelect } from 'react-icons/ai'
import { createProduct } from '../../../services/products'

const ProductPanel = () => {
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState()
  const [pages, setPages] = useState()
  const [message, setMessage] = useState('')

  const clearMessage = (time) =>
    setTimeout(() => {
      setMessage('')
    }, time)

  async function productHandler(e) {
    e.preventDefault()
    if (!image || !title || !description || !category || !price || !pages) {
      setMessage('Make sure that all fields are filled')
      return clearMessage(3000)
    }

    const formData = new FormData()
    formData.append('image', image)
    formData.append(
      'json',
      JSON.stringify({
        title,
        description,
        category,
        price,
        pages,
      })
    )

    const response = await createProduct(formData)
    if (response.status === 'success') {
      setMessage('product created')
      setImage(null)
      setImagePreview(null)
      setTitle('')
      setPrice('')
      setPages('')
      setDescription('')
      setCategory('')
      clearMessage(2000)
    } else if (response.status === 'fail') {
      setMessage(response.message)
      clearMessage(4000)
    }
  }

  function imageSelect(event) {
    const image = event.target.files[0]
    setImage(image)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    if (image) {
      reader.readAsDataURL(image)
    }
  }
  return (
    <main className={styles.container}>
      <div className={styles.empty}>{message && <p>{message}</p>}</div>

      <form
        onSubmit={productHandler}
        className={styles.form}
      >
        <div className={styles.imageWrapper}>
          {imagePreview ? (
            <img
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
                width: '100%',
                height: '100%',
              }}
              src={imagePreview}
              alt="preview"
            />
          ) : (
            <div className={styles.image}>
              <img
                src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                alt="select a file"
              />
            </div>
          )}
          <AiOutlineSelect className={styles.selectIcon} />
          <input
            className={styles.selectImage}
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={imageSelect}
          />
        </div>
        <div className={styles.rightWrapper}>
          <label htmlFor="title">
            Title*
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            Description*
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className={styles.rightInner}>
            <label htmlFor="price">
              Price*
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label htmlFor="pages">
              Pages*
              <input
                type="number"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </label>
            <label htmlFor="category">
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
              >
                <option value="">Select Category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="game development">Game development</option>
              </select>
            </label>
          </div>
          <button
            className={styles.addProduct}
            type="submit"
          >
            Add Product 💣
          </button>
        </div>
      </form>
    </main>
  )
}

export default ProductPanel
