import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// component
import Header from './components/Header/Header'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getUserStatus, isUserExist } from './store/userSlice'

// pages
import NotFound from './pages/NotFound/NotFound'
import BlogPanel from './pages/Blog/BlogPanel/BlogPanel'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'

// protected route
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Loading from './Loading/Loading'

const App = () => {
  const dispatch = useDispatch()
  const userStatus = useSelector(getUserStatus)

  const Blog = React.lazy(() => import('./pages/Blog/Blog'))

  const ResetPassword = React.lazy(() =>
    import('./pages/ResetPassword/ResetPassword')
  )

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
            <ProtectedRoute isUser={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isUser={true}>
              <Signup />
            </ProtectedRoute>
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
            <ProtectedRoute isUser={false}>
              <BlogPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
