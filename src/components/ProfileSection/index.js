import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails

    return (
      <div className="profile-bg-container">
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }
}

export default ProfileSection
