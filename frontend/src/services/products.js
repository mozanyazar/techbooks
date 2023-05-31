export const createProduct = async (formData) => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/products',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    )

    return response.json()
  } catch (error) {}
}

export const getAllProducts = async (query) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}api/v1/products${query ? query : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
export const getProduct = async (query) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}api/v1${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
