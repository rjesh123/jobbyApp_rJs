import {HiLocationMarker} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {MdHome} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-item">
      <div className="job-company-details-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="job-description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobs
