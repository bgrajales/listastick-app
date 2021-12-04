import React, { useContext, useState } from 'react'
import { format } from 'date-fns'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { IoMdClose } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { addNewTask } from '../../../actions/todos'
import { useForm } from '../../../hooks/useForm'
import { AuthContext } from '../../../routers/AppRouter'

export const AddNewTask = ({ show, setModal }) => {

    const MySwal = withReactContent(Swal)

    const { state: authState } = useContext(AuthContext)
    const [ addingState, setAddingState ] = useState(false)
    const [ addError, setAddError ] = useState({
      error: false,
      message: ''
    })
    
    const initialState = { 
        title: '',
        priority: 'low',
        description: '',
        dueDate: format(new Date(), 'yyyy-MM-dd')
    }  

    const [ formValues, handleInputChange, reset ] = useForm(initialState)

    const handleAddNewSubmit = async(e) => {
      e.preventDefault()

      setAddingState(true)
      setAddError({
        error: false,
        message: ''
      })

      const data = {
        ...formValues,
        completed: false
      }

      const added = await addNewTask(data, authState.token, setAddError)

      if(added.status) {
        setAddingState(false)
        reset()

        MySwal.fire({
          icon: 'success',
          title: 'Task added successfully',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        setAddingState(false)
      }
        
    }

    const handleCloseClick = () => {
      setModal('none')
    }

    
    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
         
            <IoMdClose className="nav__closeModal" onClick={ handleCloseClick }/>
            
            
            

            <form className="nav__expandedAddTask" onSubmit={ handleAddNewSubmit }>

              {
                addError.error &&
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{addError.message}</Alert>
                  </Stack>
              }

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
                <button type="submit" className="btn btn-primary btn-block">
                  {
                    (addingState) 
                    ? <AiOutlineLoading3Quarters className="app__loadingIcon" /> 
                    : 'Add New'
                  }
                </button>
              </div>

            </form>
        </div>
    )
}
