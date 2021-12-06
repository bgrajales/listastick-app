import React, { useContext, useState } from 'react'
import { IoMdClose, IoMdCheckmark } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useForm } from '../../../hooks/useForm'
import { editTodo } from '../../../actions/todos'
import { AuthContext } from '../../../routers/AppRouter'

export const EditTaskModal = ({ todo, setEditTask, handleExpandedTaskClose }) => {

    const { state: authState } = useContext(AuthContext)

    const [ editState, setEditState ] = useState({
        loading: false,
        error: ''
    })

    const [ formValues, handleInputChange ] = useForm({
        title: todo.title,
        dueDate: todo.dueDate,
        priority: todo.priority,
        description: todo.description
    })

    const handleSaveTaskEdit = () => {

        setEditState({
            loading: true,
            error: ''
        })

        const newTodo = {
            id: todo.id,
            title: formValues.title.trim(),
            dueDate: formValues.dueDate,
            priority: formValues.priority,
            description: formValues.description.trim(),
            completed: todo.completed
        }

        editTodo( todo.id, newTodo, authState.token, setEditState )
        
    }

    const handleCancelEdit = () => {
        setEditTask(false)
    }

    return (
        <div className={`expandedTask__modal`}>

                <IoMdClose className="nav__closeModal" onClick={ handleExpandedTaskClose }/>

                <div className="expandedTask__card">

                    {
                        editState.error !== '' &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">{editState.error}</Alert>
                        </Stack>
                    }

                    <div>
                        <input type="text" className="form-control" name="title" value={formValues.title} onChange={ handleInputChange }/>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Date:</h4>
                        <input type="date" className="form-control" name="dueDate" value={formValues.dueDate} onChange={ handleInputChange }/>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Priority:</h4>
                        <select className="form-control" name="priority" value={formValues.priority} onChange={ handleInputChange }>
                            <option value="low">Low</option>
                            <option value="mid">Medium</option>
                            <option value="high">High</option>
                        </select>
                        
                    </div>
    
                    <div className="expandedTask__description">
                        <h4>Content:</h4>
                        <textarea className="form-control" rows="5" name="description" value={formValues.description} onChange={ handleInputChange }/>
                    </div>
    
                    <div className="expandedTask__btns">
                        <button className="btn btn-primary btn-block" onClick={ handleSaveTaskEdit }>
                            {
                                editState.loading 
                                ? <AiOutlineLoading3Quarters className="app__loadingIcon" />
                                : <>'Save changes' <IoMdCheckmark className="expandedTask__icon"/></>
                            }
                        </button>
                        <button className="btn btn-danger btn-block" onClick={ handleCancelEdit }>
                            Cancel <IoMdClose className="expandedTask__icon"/>  
                        </button>
                    </div>
    
                </div>
            </div>
    )
}
