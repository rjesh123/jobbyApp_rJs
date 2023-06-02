import {Link} from 'react-router-dom'
import {HiLocationMarker} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {MdHome} from 'react-icons/md'
import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  const renderJobsView = () => (
    <Link to={`/jobs/${id}`} className="link-item">
      <li key={id} className="job-item-container">
        <div className="job-company-details-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )

  return renderJobsView()
}

export default JobsCard
