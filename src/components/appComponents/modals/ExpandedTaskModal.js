import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { AuthContext } from '../../../routers/AppRouter'
import { changeStatusTask, deleteSelectedTask } from '../../../actions/todos'
import { EditTaskModal } from './EditTaskModal'
import { TaskExpanded } from './TaskExpanded'

export const ExpandedTaskModal = ({ show, todo, handleExpandedTaskClose, handleDeleted }) => {
    
    const MySwal = withReactContent(Swal)

    const { state: authState } = useContext(AuthContext)
    const [editTask, setEditTask] = useState(false)

    const [ showTodo, setShowTodo ] = useState(todo)
    const [ completed, setCompleted ] = useState(false)

    useEffect(() => {
    }, [showTodo])

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
                deleteSelectedTask( todo, authState.token, handleDeleted )
            }
        }) 
    }

    const handleCompletedClick = () => {
        setCompleted(true)

        changeStatusTask( showTodo, authState.token, null, null, setCompleted, setShowTodo, handleDeleted )
    }

    const handleEditClick = () => {
        setEditTask(true)
    }
    
    if (show) {
        return (
            !editTask 
            ? <TaskExpanded 
                show={show} 
                todo={showTodo} 
                handleExpandedTaskClose={handleExpandedTaskClose} 
                handleCompletedClick={handleCompletedClick} 
                handleEditClick={handleEditClick} 
                handleDeleteClick={handleDeleteClick}
                completed={completed}
              />            
            : <EditTaskModal 
                todo={showTodo} 
                setShowTodo={setShowTodo} 
                setEditTask={setEditTask}
                handleExpandedTaskClose={handleExpandedTaskClose}
                handleDeleted={handleDeleted} 
                />
        )
    } else {
        return null
    }
    
}
