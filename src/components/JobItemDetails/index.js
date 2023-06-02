import {Component} from 'react'
import {HiLocationMarker} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {MdHome} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import SkillsSet from '../SkillsSet'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    apiStatus: apiStatusConstants.initial,
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedSimilarJobsData = similarJobData => ({
    companyLogoUrl: similarJobData.company_logo_url,
    employmentType: similarJobData.employment_type,
    id: similarJobData.id,
    jobDescription: similarJobData.job_description,
    location: similarJobData.location,
    rating: similarJobData.rating,
    title: similarJobData.title,
  })

  getFormattedJobDetailsData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobDetailsData = this.getFormattedJobDetailsData(
        data.job_details,
      )
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarJobsData(eachSimilarJob),
      )
      this.setState({
        jobItemDetails: updatedJobDetailsData,
        similarJobsList: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="job-item-response-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobItemDetails, similarJobsList} = this.state
    const {
      lifeAtCompany,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobItemDetails
    return (
      <>
        <div className="job-item-response-container">
          <div className="job-details-container">
            <div className="job-company-details-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="salary-location-emp-container">
              <div className="location-emp-container">
                <div className="location-container">
                  <HiLocationMarker className="location-emp-icon" />
                  <p className="location-emp">{location}</p>
                </div>
                <div className="emp-container">
                  <MdHome className="location-emp-icon" />
                  <p className="location-emp">{employmentType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="description-website-link-container">
              <h1 className="job-description-heading">Description</h1>
              <div className="link-icon-container">
                <a href={companyWebsiteUrl} className="visit-link">
                  Visit
                </a>
                <BiLinkExternal className="bi-link" />
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachSkill => (
                <SkillsSet skillDetails={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(eachSimilarJob => (
            <SimilarJobs
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
