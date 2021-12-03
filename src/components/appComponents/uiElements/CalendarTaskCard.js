import React from 'react'

export const CalendarTaskCard = ({ todo }) => {
    return (
        <div className="calendar__card">
            <div className={`calendar__cardIndicator taskCard__${(todo.completed ? "completed" : todo.priority)}`}></div>
            <h5 className={`${(todo.completed ? "text-decoration-line-through" : "")}`}>{todo.title}</h5>
        </div>
    )
}
