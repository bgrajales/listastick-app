import { format } from 'date-fns'
import React, { useContext } from 'react'

import { IoMdClose } from 'react-icons/io'
import { useForm } from '../../../hooks/useForm'
import { AuthContext } from '../../../routers/AppRouter'
import { apiUrl } from '../../../utils/apiUrl'

export const AddNewTask = ({ show, setModal }) => {

  const { state: authState } = useContext(AuthContext)

  const initialState = { 
        title: '',
        priority: 'low',
        description: '',
        dueDate: format(new Date(), 'yyyy-MM-dd')
    }  

    const [ formValues, handleInputChange ] = useForm(initialState)

    const handleAddNewSubmit = (e) => {
      e.preventDefault()

      //Dispatch request action (Loading)

      const data = {
        ...formValues,
        completed: false
      }

      fetch(apiUrl('todos'), {
        method: 'POST',
        headers: {
          'authorization': authState.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      }).then(data => {
        // formValues = {
        //   title: '',
        //   priority: 'low',
        //   description: '',
        //   dueDate: format(new Date(), 'yyyy-MM-dd')
        // }

        //Dispatch succes action
      }).catch(err => {
        console.log(err)
        //Dispatch failure action
      })
    }

    const handleCloseClick = () => {
      setModal('none')
    }

    
    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
            <IoMdClose className="nav__closeModal" onClick={ handleCloseClick }/>
            
            <form className="nav__expandedAddTask" onSubmit={ handleAddNewSubmit }>


              <div className="smallInputDiv">
                <label className="form-label">Task title</label>
                <input className="form-control nav__modalInput" type="text" name="title" onChange={ handleInputChange } value={ formValues.title }/>
              </div>

              <div className="smallInputDiv">
                <label className="form-label">Priority</label>
                <select className="form-control nav__modalInput" name="priority" onChange={ handleInputChange } value={ formValues.priority }>
                  <option value="low">Low</option>
                  <option value="mid">Medium</option>
                  <option  value="high">High</option>
                </select>
              </div>

              <div className="smallInputDiv">
                <label className="form-label">Deadline</label>
                <input className="form-control nav__modalInput" type="date" name="dueDate" onChange={ handleInputChange } value={ formValues.dueDate }/>
              </div>

              <div className="smallInputDiv">
                <label className="form-label">Description</label>
                <textarea className="form-control nav__modalInput" name="description" onChange={ handleInputChange } value={ formValues.description }/>
              </div>
              
              <div id="taskAddBtnSec">
                <button type="submit" className="btn btn-primary btn-block">Add Task</button>
              </div>

            </form>
        </div>
    )
}
