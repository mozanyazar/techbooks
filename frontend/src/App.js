import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'

import { useDispatch, useSelector } from 'react-redux'
import { getUserStatus, isUserExist } from './store/userSlice'
import ResetPassword from './pages/ResetPassword/ResetPassword'
const App = () => {
  const dispatch = useDispatch()
  const userStatus = useSelector(getUserStatus)

  const Signup = React.lazy(() => import('./pages/Signup/Signup'))
  const Login = React.lazy(() => import('./pages/Login/Login'))

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(isUserExist())
    }
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={'loading'}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={'loading'}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="reset_password/:token"
          element={
            <Suspense fallback={<h1>Loading... </h1>}>
              <ResetPassword />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
