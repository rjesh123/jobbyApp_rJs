import './index.css'

const SkillsSet = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-item">
      <div className="skill-container">
        <img src={imageUrl} alt={name} className="skill-logo" />
        <p className="skill-text">{name}</p>
      </div>
    </li>
  )
}

export default SkillsSet
