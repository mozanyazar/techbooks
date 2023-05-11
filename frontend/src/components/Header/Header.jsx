import React, { useState } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

import vector from '../../images/Vector.png'
import facebook from '../../images/Facebook.png'
import twitter from '../../images/Twitter.png'
import linkedin from '../../images/LinkedIn.png'
import basketImg from '../../images/basket.png'

import { useSelector, useDispatch } from 'react-redux'
import { getUser, logout } from '../../store/userSlice'
import { basket, getBasketStatus } from '../../store/basketSlice'
import Basket from '../Basket/Basket'
const Header = () => {
  const user = useSelector(getUser)

  const userBasket = useSelector(basket)
  const [basketOpenAndClose, setBasketOpenAndClose] = useState(false)
  const basketStatus = useSelector(getBasketStatus)

  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)

  const toggleHandler = () => {
    setToggle(!toggle)
    let html = document.getElementsByTagName('html')[0]

    if (!toggle) {
      html.classList.add('active')
    } else {
      html.classList.remove('active')
    }
  }
  // basket toggle
  const basketToggle = (event) => {
    event.preventDefault()
    setBasketOpenAndClose(!basketOpenAndClose)
  }

  return (
    <header className={styles.container}>
      {basketOpenAndClose && basketStatus === 'succeeded' && (
        <Basket
          basketToggle={basketToggle}
          basketOpenAndClose={basketOpenAndClose}
        />
      )}
      <div className={styles.innerContainer}>
        <div className={styles.leftWrapper}>
          <Link
            className={styles.logoWrapper}
            to="/"
          >
            <img
              width={24.5}
              src={vector}
              alt="Books Website logo"
            />
            <p>TechB</p>
          </Link>

          <div className={styles.headerIcons}>
            <Link>
              <img
                src={facebook}
                alt="facebook"
              />
            </Link>
            <Link>
              <img
                src={twitter}
                alt="twitter"
              />
            </Link>
            <Link>
              <img
                src={linkedin}
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
        <nav
          className={`${styles.navbar} ${toggle ? `${styles.active}` : null}`}
        >
          <ul className={styles.pagesList}>
            <li>
              <Link
                to={'/'}
                onClick={toggleHandler}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={toggleHandler}
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                to={'/blog'}
                onClick={toggleHandler}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link to={'/'}>Forum</Link>
            </li>
            <li>
              <Link onClick={toggleHandler}>Contact</Link>
            </li>
            {user.length !== 0 && (
              <button
                onClick={(e) => basketToggle(e)}
                className={styles.basketButton}
              >
                <img
                  width={22}
                  src={basketImg}
                  alt="basket"
                />
                <p>
                  {basketStatus === 'succeeded' && userBasket
                    ? userBasket.items.length
                    : 0}
                </p>
              </button>
            )}
          </ul>
          {user.length !== 0 ? (
            <button
              onClick={() => {
                dispatch(logout()).then(() => window.location.reload())
              }}
              className={`${styles.orderToday} ${styles.logout}`}
            >
              Logout
            </button>
          ) : (
            <div className={styles.orderTodayWrapper}>
              <button className={styles.orderToday}>Order Today</button>
              <div>
                <Link
                  onClick={toggleHandler}
                  to="/signup"
                >
                  Signup
                </Link>
                <Link
                  onClick={toggleHandler}
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>
        <button
          className={`${styles.toggle} ${toggle && `${styles.active}`}`}
          onClick={() => toggleHandler()}
        >
          <b></b>
          <b></b>
          <b></b>
        </button>
      </div>
    </header>
  )
}

export default Header
