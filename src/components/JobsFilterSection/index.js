import './index.css'

const JobFilterSection = props => {
  const renderSalaryRanges = () => {
    const {salaryRangesList, changeSalaryRange} = props

    return (
      <>
        <h1 className="heading">Salary Range</h1>
        {salaryRangesList.map(eachRange => (
          <li
            className="employment-list-item"
            key={eachRange.salaryRangeId}
            onChange={changeSalaryRange(eachRange.salaryRangeId)}
          >
            <input type="radio" id={eachRange.salaryRangeId} />
            <label htmlFor={eachRange.salaryRangeId} className="label-text">
              {eachRange.label}
            </label>
          </li>
        ))}
      </>
    )
  }

  const renderEmploymentTypes = () => {
    const {employmentTypesList, changeEmploymentType} = props
    const onChangeEmploymentType = event => {
      changeEmploymentType(event.target.value)
    }
    return (
      <>
        <h1 className="heading">Type of Employment</h1>
        {employmentTypesList.map(eachType => (
          <li
            className="employment-list-item"
            onChange={onChangeEmploymentType}
            key={eachType.employmentTypeId}
          >
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              value={eachType.employmentTypeId}
            />
            <label htmlFor={eachType.employmentTypeId} className="label-text">
              {eachType.label}
            </label>
          </li>
        ))}
      </>
    )
  }

  return (
    <>
      <div className="employment-container">
        <hr className="hr-line" />
        {renderEmploymentTypes()}
      </div>
      <div>
        <hr className="hr-line" />
        {renderSalaryRanges()}
      </div>
    </>
  )
}

export default JobFilterSection
