import React, { useContext } from 'react'
import { format, parseISO } from 'date-fns'
import { IoMdClose } from 'react-icons/io'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { AuthContext } from '../../../routers/AppRouter'
import { changeStatusTask, deleteSelectedTask } from '../../../actions/todos'

export const ExpandedTaskModal = ({ show, todo, handleExpandedTaskClose }) => {
    
    const MySwal = withReactContent(Swal)

    const { state: authState } = useContext(AuthContext)

    const handleDeleteClick = () => {

        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                handleExpandedTaskClose()
                deleteSelectedTask( todo, authState.token )
            }
        }) 
    }

    const handleCompletedClick = () => {
        changeStatusTask( todo, authState.token )
    }
    
    if (show) {
        return (
            <div className={`expandedTask__modal ${show ? '' : 'd-none'}`}>

                <IoMdClose className="nav__closeModal" onClick={ handleExpandedTaskClose }/>

                <div className="expandedTask__card">
                    <div>
                        <h2>- {todo.title}</h2>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Due date: </h4>
                        <p>{format(parseISO(todo.dueDate), 'dd/MM/yyyy')}</p>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Priority:</h4>
                        <p>{todo.priority}</p>
                    </div>
    
                    <div className="expandedTask__description">
                        <h4>Content:</h4>
                        <p>{todo.description}</p>
                    </div>
    
                    <div className="expandedTask__btns">
                        <button className="btn btn-success btn-block" onClick={handleCompletedClick}>Mark as Completed</button>
                        <button className="btn btn-danger btn-block" onClick={handleDeleteClick}>Delete Task</button>
                    </div>
    
                </div>
            </div>
        )
    } else {
        return null
    }
    
}
