import './index.css'

const JobFilterSection = props => {
  const getSalary = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachRange => {
      const {changeSalaryRange} = props

      const onChangeSalary = () => changeSalaryRange(eachRange.salaryRangeId)

      return (
        <li
          className="employment-list-item"
          key={eachRange.salaryRangeId}
          onChange={onChangeSalary}
        >
          <input type="radio" id={eachRange.salaryRangeId} />
          <label htmlFor={eachRange.salaryRangeId} className="label-text">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRanges = () => (
    <div className="employment-container">
      <hr className="hr-line" />
      <ul>{getSalary()}</ul>
    </div>
  )

  const getEmploymentType = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachType => {
      const {changeEmploymentType} = props
      const onChangeEmploymentType = event => {
        changeEmploymentType(event.target.value)
      }
      return (
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
      )
    })
  }

  const renderEmploymentTypes = () => (
    <div className="employment-container">
      <hr className="hr-line" />
      <h1 className="heading">Type of Employment</h1>
      <ul>{getEmploymentType()}</ul>
    </div>
  )

  return (
    <>
      {renderEmploymentTypes()}
      {renderSalaryRanges()}
    </>
  )
}

export default JobFilterSection
