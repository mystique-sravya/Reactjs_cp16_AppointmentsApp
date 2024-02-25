// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const staredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-list">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-btn"
          data-testid="star"
          onClick={onClickStar}
        >
          <img className="star-img" src={staredImgUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
