import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserStatus, isUserExist } from '../store/userSlice'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const ProtectedRoute = ({ children, isUser }) => {
  const userStatus = useSelector(getUserStatus)
  const user = useSelector(getUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isUserExist())
  }, [dispatch])

  if (userStatus === 'succeeded') {
    if (!isUser) {
      if (user.length === 0) {
        return <Navigate to="/login" />
      }
      return children
    } else {
      if (user.length !== 0) {
        return <Navigate to="/" />
      }
      return children
    }
  }
}

export default ProtectedRoute
