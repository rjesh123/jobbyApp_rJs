import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPasswordFiled = () => {
    const {password} = this.state
    return (
      <div className="input-label-container">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="input-label-container">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="app-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-image"
          />
          <div className="username-password-container">
            {this.renderUsernameField()}
            {this.renderPasswordFiled()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">* {errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
