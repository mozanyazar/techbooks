import React from 'react'
import { HomeFirstRow } from './HomeFirstRow/HomeFirstRow'
import HomeSecondRow from './HomeSecondRow/HomeSecondRow'
import { HomeThirdRow } from './HomeThirdRow/HomeThirdRow'
import HomeFourthRow from './HomeFourthRow/HomeFourthRow'

const Home = () => {
  return (
    <main>
      <HomeFirstRow />
      <HomeSecondRow />
      <HomeThirdRow />
      <HomeFourthRow />
    </main>
  )
}

export default Home
