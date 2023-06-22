// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isStarredButtonActive: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickStarredButton = () => {
    const {isStarredButtonActive} = this.state
    this.setState({isStarredButtonActive: !isStarredButtonActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFav: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  isToggle = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFav: !eachItem.isFav}
        }
        return eachItem
      }),
    }))
  }

  getAppointmentsList = () => {
    const {appointmentsList, isStarredButtonActive} = this.state

    if (isStarredButtonActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFav === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isStarredButtonActive} = this.state
    const filterClassName = isStarredButtonActive ? 'filter-filled' : 'empty'
    const filteredAppointments = this.getAppointmentsList()

    return (
      <div className="container">
        <div className="app-card">
          <form className="form" onSubmit={this.onAddAppointment}>
            <h1>Add Appointment</h1>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={titleInput}
              onChange={this.onChangeTitle}
            />

            <label htmlFor="date">Date</label>
            <input
              id="date"
              onChange={this.onChangeDate}
              type="date"
              value={dateInput}
            />

            <button type="submit" className="button">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
            className="image"
          />

          <hr />
          <div>
            <h1>Appointments</h1>
            <button
              type="button"
              onClick={this.onClickStarredButton}
              className={`filter ${filterClassName}`}
            >
              Starred
            </button>
          </div>

          <ul>
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                isToggle={this.isToggle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
