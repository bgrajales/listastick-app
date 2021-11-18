import React, { useContext, useState } from 'react'
import { MdDone, MdMoreHoriz } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import { parseISO, toDate } from 'date-fns'

import { apiUrl } from '../../utils/apiUrl'
import { AuthContext } from '../../routers/AppRouter'

export const TaskCard = ({todo}) => {

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
        fetch(apiUrl(`todos/${todo.id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: authState.token
            },
            body: JSON.stringify({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                priority: todo.priority,
                dueDate: todo.dueDate,
                completed: !todo.completed,
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.log('error')
            }
        }).then(data => {
            setCompleted(!completed)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleDeleteClick = () => {
        fetch(apiUrl(`todos/${todo.id}`), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: authState.token
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.log('error')
            }
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
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
                <MdDone className="taskCard__changeStatus app__pointer" onClick={ handleCompletedClick }/>
                <MdMoreHoriz className="taskCard__viewTodos app__pointer" />
            </div>
        </div>
    )
}
