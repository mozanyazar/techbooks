export const updateBasket = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}api/v1/basket`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
export const getBasket = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}api/v1/basket`, {
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

export const deleteItem = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}api/v1/basket`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
