import React, { useContext, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { IoMdClose, IoMdTrash, IoMdCheckmark } from 'react-icons/io'
import { AiFillEdit } from 'react-icons/ai'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { AuthContext } from '../../../routers/AppRouter'
import { changeStatusTask, deleteSelectedTask } from '../../../actions/todos'
import { EditTaskModal } from './EditTaskModal'

export const ExpandedTaskModal = ({ show, todo, handleExpandedTaskClose }) => {
    
    const MySwal = withReactContent(Swal)

    const { state: authState } = useContext(AuthContext)
    const [editTask, setEditTask] = useState(false)

    // useEffect(() => {
    // }, [editTask])

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

    const handleEditClick = () => {
        setEditTask(true)
    }
    
    if (show) {
        return (
            !editTask ? 
            <div className={`expandedTask__modal ${show ? '' : 'd-none'}`}>

                <IoMdClose className="nav__closeModal" onClick={ handleExpandedTaskClose }/>

                <div className="expandedTask__card">

                    <div>
                        
                        <h2 className={todo.completed ? 'text-decoration-line-through' : ''}>
                            {
                                todo.completed ?
                                <IoMdCheckmark className="expandedTask__checkmark" onClick={ handleCompletedClick }/>
                                : null
                            }
                            {todo.title}
                            <AiFillEdit className="expandedTask__editBtn app__pointer" onClick={ handleEditClick }/>
                        </h2>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Due date: </h4>
                        <p>{format(parseISO(todo.dueDate), 'dd/MM/yyyy')}</p>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Priority:</h4>
                        <p>
                            <span className={`expandedTask__priority${
                                todo.priority === 'low' ? ' expandedTask__low' : todo.priority === 'mid' ? ' expandedTask__medium' : ' expandedTask__high'
                            }`}></span>
                            {
                                todo.priority === 'low' ? 'Low' : todo.priority === 'mid' ? 'Medium' : 'High'
                            }
                        </p>
                    </div>
    
                    <div className="expandedTask__description">
                        <h4>Content:</h4>
                        <p>{todo.description}</p>
                    </div>
    
                    <div className="expandedTask__btns">
                        <button className="btn btn-primary btn-block" onClick={handleCompletedClick}>
                            {
                                todo.completed ? 'Mark as pending  ' : 'Mark as completed  '
                            }
                            {
                                todo.completed ? <IoMdClose className="expandedTask__icon"/> : <IoMdCheckmark className="expandedTask__icon"/>
                            }
                        </button>
                        <IoMdTrash className={`expandedTask__trashCan app__pointer`} onClick={ handleDeleteClick }/>

                    </div>
    
                </div>
            </div>
            : <EditTaskModal todo={todo} setEditTask={setEditTask} handleExpandedTaskClose={handleExpandedTaskClose} />
        )
    } else {
        return null
    }
    
}
