export const createReview = async (data) => {
  try {
    const response = await fetch('/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return response.json()
  } catch (error) {}
}
