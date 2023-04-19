export const createBlog = async (formData) => {
  try {
    const response = await fetch('/api/v1/blogs', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    return response.json()
  } catch (error) {}
}
export const getBlog = async (id) => {
  try {
    const response = await fetch(`/api/v1/blogs/${id}`, {
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

export const getAllBlogs = async (query) => {
  try {
    const response = await fetch(`/api/v1/blogs${query ? query : ''}`, {
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
