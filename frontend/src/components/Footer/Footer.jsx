import React, { useState } from 'react'
import styles from './Footer.module.css'
import photo from '../../images/Vector.png'
import p1 from '../../images/p1.png'
import p2 from '../../images/p2.png'
import p3 from '../../images/p3.png'
import p4 from '../../images/p4.png'
import { BsGithub } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
const Footer = () => {
  const [mess, setMess] = useState('')

  function keepInTouchHandler(e) {
    e.preventDefault()
    setMess('The message has been received')
    setTimeout(() => {
      setMess('')
    }, 2000)
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerTopLeft}>
            <div className={styles.footerLogos}>
              <img
                src={photo}
                alt="logooo"
              />
              <a href="/">Pages</a>
            </div>
            <div className={styles.footerSocials}>
              <a>
                <img
                  src={p1}
                  alt="p1"
                />
              </a>
              <a>
                <img
                  src={p2}
                  alt="p2"
                />
              </a>
              <a>
                <img
                  src={p3}
                  alt="p3"
                />
              </a>
              <a>
                <img
                  src={p4}
                  alt="p4"
                />
              </a>
            </div>
          </div>
          <div className={styles.footerTopRight}>
            <h4>Keep In Touch</h4>
            <div>
              <p>Mahmut Ozan Yazar</p>
              <div className={styles.social}>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/mahmutozanyazar/"
                >
                  <AiFillLinkedin
                    color="white"
                    fontSize={40}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.github.com/mozanyazar"
                >
                  <BsGithub
                    color="white"
                    fontSize={34}
                  />
                </a>
              </div>
            </div>
          </div>
          <form
            onSubmit={keepInTouchHandler}
            className={styles.form}
          >
            {mess ? (
              <div className={styles.mess}>{mess}</div>
            ) : (
              <textarea placeholder="Keep in touch"></textarea>
            )}
            <button type="submit">submit</button>
          </form>
        </div>
        <div className={styles.footerBottom}>
          <a href="https://webflow.com">
            <b>&copy;</b>
            Drafted by <b>Victorflow</b> - Powered by <b>Webflow</b>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
