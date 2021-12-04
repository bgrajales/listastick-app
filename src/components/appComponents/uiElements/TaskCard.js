import React, { useContext, useState } from 'react'
import { MdDone, MdMoreHoriz } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import { parseISO, toDate } from 'date-fns'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { AuthContext } from '../../../routers/AppRouter'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { changeStatusTask, deleteSelectedTask } from '../../../actions/todos'

export const TaskCard = ({ todo, handleSeeMore }) => {

    const MySwal = withReactContent(Swal)

    const [hover, setHover] = useState(false)
    const [completed, setCompleted] = useState(todo.completed)
    const { state: authState } = useContext(AuthContext)

    const handleCardHoverIn = () => {
        setHover(true)
    }

    const handleCardHoverOut = () => {
        setHover(false)
    }

    const handleCompletedClick = () => {

        changeStatusTask( todo, authState.token, setCompleted, completed )

    }

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
                deleteSelectedTask( todo, authState.token )
            }
        }) 
    }

    const todoDate = toDate(parseISO(todo.dueDate))

    return (
        <div className="taskCard__card" onMouseEnter={ handleCardHoverIn } onMouseLeave={ handleCardHoverOut }>
            <div className={`taskCard__importanceIndicator taskCard__${(completed ? "completed" : todo.priority)}`}>
                <h4>{todoDate.getDate()}/{todoDate.getMonth() + 1}</h4>
            </div>
            <IoMdTrash className={`taskCard__trashCan app__pointer ${(!hover) ? 'd-none' : ''}`} onClick={ handleDeleteClick }/>
            <div className="taskCard__textInfo">
                <h3 className={completed ? `taskCard__completedTitle` : ''}>{todo.title}</h3>
                <p>{`${todo.description.substring(0, 90)} . . .`}</p>
            </div>

            <div className={`taskCard__hoverDiv ${(!hover) ? 'd-none' : ''}`}>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250 }}
                    overlay={ <Tooltip id="button-tooltip-2" >Mark as Completed</Tooltip> }
                >
                    <div>
                        <MdDone className="taskCard__changeStatus app__pointer" onClick={ handleCompletedClick }/>
                    </div>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250 }}
                    overlay={ <Tooltip id="button-tooltip-2" >See More</Tooltip> }
                >
                    <div>
                        <MdMoreHoriz className="taskCard__viewTodos app__pointer" onClick={ () => handleSeeMore(todo) }/>
                    </div>
                </OverlayTrigger>
            </div>
        </div>
    )
}
