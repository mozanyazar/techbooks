import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Component
import Header from './components/Header/Header'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getUserStatus, isUserExist } from './store/userSlice'

// Protected route
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
// Loading animation
import Loading from './Loading/Loading'

const App = () => {
  const dispatch = useDispatch()
  const userStatus = useSelector(getUserStatus)

  // fake delay for show loading component
  function fakeDelay(ms) {
    return (promise) =>
      promise.then(
        (data) =>
          new Promise((resolve) => {
            setTimeout(() => resolve(data), ms)
          })
      )
  }

  // Dynamic imports
  const Blog = React.lazy(() => fakeDelay(1400)(import('./pages/Blog/Blog')))
  const Home = React.lazy(() => fakeDelay(1400)(import('./pages/Home/Home')))
  const NotFound = React.lazy(() =>
    fakeDelay(1400)(import('./pages/NotFound/NotFound'))
  )
  const BlogPanel = React.lazy(() =>
    fakeDelay(1400)(import('./pages/Blog/BlogPanel/BlogPanel'))
  )
  const Login = React.lazy(() => fakeDelay(1400)(import('./pages/Login/Login')))
  const Signup = React.lazy(() =>
    fakeDelay(1400)(import('./pages/Signup/Signup'))
  )
  const ResetPassword = React.lazy(() =>
    fakeDelay(1400)(import('./pages/ResetPassword/ResetPassword'))
  )

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(isUserExist())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute isUser={true}>
                <Login />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute isUser={true}>
                <Signup />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="reset_password/:token"
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<Loading />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/blog_panel"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute isUser={false}>
                <BlogPanel />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
