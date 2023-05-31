import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileSection from '../ProfileSection'
import JobsFilterSection from '../JobsFilterSection'
import JobsCard from '../JobsCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    jobsList: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    this.setState({apiStatus: apiConstantStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderJobsInprogressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobsCard jobDetails={eachJob} key={eachJob.id} jobsList={jobsList} />
        ))}
      </ul>
    )
  }

  renderFilteredJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderJobsSuccessView()
      case apiConstantStatus.inProgress:
        return this.renderJobsInprogressView()
      case apiConstantStatus.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsList)
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="input-container">
        <input
          className="input-filed"
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
          onClick={this.getJobDetails}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobsList)
  }

  changeEmploymentType = type => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, type],
      }),
      this.getJobsList,
    )
  }

  renderJobFilterSection = () => (
    <JobsFilterSection
      employmentTypesList={employmentTypesList}
      salaryRangesList={salaryRangesList}
      changeEmploymentType={this.changeEmploymentType}
      changeSalaryRange={this.changeSalaryRange}
    />
  )

  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="mobile-view-jobs-container">
          {this.renderSearchInput()}
          <ProfileSection />
          {this.renderJobFilterSection()}
          {this.renderFilteredJobsList()}
        </div>
        <div className="desktop-view-jobs-container">
          <div className="profile-jobs-filter-container">
            <ProfileSection />
            {this.renderJobFilterSection()}
          </div>
          <div className="search-jobs-list-container">
            {this.renderSearchInput()}
            {this.renderFilteredJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
