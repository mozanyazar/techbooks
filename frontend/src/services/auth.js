export const createUser = async (data) => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/users/signup',
      {
        method: 'POST',
        body: data,
        credentials: 'include',
      }
    )

    return response.json()
  } catch (error) {
    return console.log(error)
  }
}

// on every refresh checking user token and  id is still true if true send to user information to client
export const verifiedToken = async (data) => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/users/verifyToken',
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
  } catch (error) {
    return console.log(error)
  }
}

export const userLogout = async () => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/users/logOut',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
      }
    )

    return response.json()
  } catch (error) {
    return console.log(error)
  }
}

export const userLogin = async (data) => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/users/logIn',
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
  } catch (error) {
    return console.log(error)
  }
}

export const forgotPassword = async (data) => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/users/forgot-password',
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

export const resetPassword = async (data) => {
  try {
    const response = await fetch(
      'https://techbook-react-express.onrender.com/api/v1/users/reset-password',
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
