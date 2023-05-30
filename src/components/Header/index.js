import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="link-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="mobile-header-icons-view">
        <Link to="/" className="link-view">
          <li className="list-item">
            <MdHome className="icons" />
          </li>
        </Link>
        <Link to="/jobs" className="link-view">
          <li className="list-item">
            <BsBriefcaseFill className="icons" />
          </li>
        </Link>
        <button
          type="button"
          className="mobile-logout-button"
          onClick={onClickLogout}
        >
          <FiLogOut className="icons" />
        </button>
      </ul>
      <ul className="desktop-header-icon-view">
        <Link to="/" className="nav-item-text link-view">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/jobs" className="nav-item-text link-view">
          <li className="list-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
