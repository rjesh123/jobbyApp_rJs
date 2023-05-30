import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <div className="text-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <div className="button-container">
            <button
              className="find-jobs-button"
              type="button"
              onClick={onClickFindJobs}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
