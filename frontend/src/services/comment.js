export const createComment = async (data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}api/v1/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    )

    return response.json()
  } catch (error) {}
}
