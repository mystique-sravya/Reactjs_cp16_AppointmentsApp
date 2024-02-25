// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isStarredFilter: false,
  }

  onClickStarred = () => {
    const {isStarredFilter} = this.state
    this.setState({isStarredFilter: !isStarredFilter})
  }

  filteredList = () => {
    const {appointmentsList, isStarredFilter} = this.state
    if (isStarredFilter) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const FilteredAppointmentsList = this.filteredList()
    const {title, date, isStarredFilter} = this.state
    const filteredStarredBtn = isStarredFilter
      ? 'filter-active-bg'
      : 'filter-inactive-bg'

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="add-appointment-container">
            <form
              className="add-appointment-form"
              onSubmit={this.onAddAppointment}
            >
              <h1 className="heading">Add Appointment</h1>
              <div>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  className="title"
                  type="text"
                  id="title"
                  onChange={this.onChangeTitleInput}
                  value={title}
                />
              </div>
              <br />
              <div>
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  className="date"
                  type="date"
                  id="date"
                  onChange={this.onChangeDateInput}
                  value={date}
                />
              </div>
              <br />
              <div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
            <div className="add-appointments-img-container">
              <img
                className="appointment-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-list-main">
            <div className="heading-button-container">
              <h1 className="heading2">Appointments</h1>
              <button
                type="button"
                className={`starred-btn ${filteredStarredBtn}`}
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {FilteredAppointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointmentDetails={each}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
