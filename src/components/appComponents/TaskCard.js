import React, { useState } from 'react'
import { MdDone, MdMoreHoriz } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import { parseISO, toDate } from 'date-fns'

export const TaskCard = ({todo}) => {

    const [hover, setHover] = useState(false)

    const handleCardHoverIn = () => {
        setHover(true)
    }

    const handleCardHoverOut = () => {
        setHover(false)
    }
    const todoDate = toDate(parseISO(todo.dueDate))

    return (
        <div className="taskCard__card shadow" onMouseEnter={ handleCardHoverIn } onMouseLeave={ handleCardHoverOut }>
            <div className={`taskCard__importanceIndicator taskCard__${(todo.completed ? "completed" : todo.priority)}`}>
                <h2>{todoDate.getDate()}/{todoDate.getUTCMonth()}</h2>
                <h3>{todoDate.getFullYear()}</h3>
            </div>
            <IoMdTrash className={`taskCard__trashCan app__pointer ${(!hover) ? 'd-none' : ''}`} />
            <div className="taskCard__textInfo">
                <h1>{todo.title}</h1>
                <p>{todo.description}</p>
            </div>

            <div className={`taskCard__hoverDiv ${(!hover) ? 'd-none' : ''}`}>
                <MdDone className="taskCard__changeStatus app__pointer" />
                <MdMoreHoriz className="taskCard__viewTodos app__pointer" />
            </div>
        </div>
    )
}
