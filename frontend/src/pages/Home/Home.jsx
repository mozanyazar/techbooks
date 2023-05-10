import React, { useEffect } from 'react'
import { HomeFirstRow } from './HomeFirstRow/HomeFirstRow'
import HomeSecondRow from './HomeSecondRow/HomeSecondRow'
import { HomeThirdRow } from './HomeThirdRow/HomeThirdRow'
import HomeFourthRow from './HomeFourthRow/HomeFourthRow'
import { useDispatch, useSelector } from 'react-redux'
import {
  latest3Blog,
  latestBlogs,
  latestBlogsStatus,
} from '../../store/homeSlice'
import Loading from '../../Loading/Loading'
import HomeFiftRow from './HomeFiftRow/HomeFiftRow'

const Home = () => {
  const latest3Blogs = useSelector(latestBlogs)
  const latestBlogStatus = useSelector(latestBlogsStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('rendered')
    if (latestBlogStatus === 'idle') {
      dispatch(latest3Blog()).then((res) => console.log(res))
    }
  }, [])

  if (latestBlogStatus === 'pending') return <Loading />
  return (
    <main>
      <HomeFirstRow />
      <HomeSecondRow />
      <HomeThirdRow />
      <HomeFourthRow />
      <HomeFiftRow blogs={latest3Blogs} />
    </main>
  )
}

export default Home
