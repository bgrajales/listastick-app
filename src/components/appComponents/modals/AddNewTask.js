import React from 'react'
import { IoMdClose } from 'react-icons/io'

export const AddNewTask = ({ show }) => {

    const handleAddNewSubmit = (e) => {
      e.preventDefault()
    }
    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
            <form className="nav__expandedAddTask" onSubmit={ handleAddNewSubmit }>

              <IoMdClose className="nav__closeModal"/>

              <div className="smallInputDiv">
                <label className="form-label">Task title</label>
                <input className="form-control nav__modalInput" type="text"/>
              </div>

              <div className="smallInputDiv">
                <label className="form-label">Priority</label>
                <select className="form-control nav__modalInput">
                  <option value="1" defaultValue>Low</option>
                  <option value="2">Medium</option>
                  <option  value="3">High</option>
                </select>
              </div>

              <div className="smallInputDiv">
                <label className="form-label">Deadline</label>
                <input className="form-control nav__modalInput" type="date" />
              </div>

              <label className="form-label">Description</label>
              <textarea className="form-control nav__modalInput" name="taskDescInput"/>

              <div id="taskAddBtnSec">
                <button type="submit" className="btn btn-primary btn-block">Add Task</button>
              </div>

            </form>
        </div>
    )
}
