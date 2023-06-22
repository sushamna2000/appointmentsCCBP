// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isToggle} = props
  const {id, title, date, isFav} = appointmentDetails

  const onClickStar = () => {
    isToggle(id)
  }

  const appointmentDate = date
    ? format(new Date(date), 'dd MMMM YYYY EEEE')
    : ''

  const StarImg = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div>
        <p>{title}</p>
        <button type="button" data-testid="star" onClick={onClickStar}>
          <img src={StarImg} alt="star" />
        </button>
        <p>Date: {appointmentDate}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
