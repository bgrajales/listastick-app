import React from 'react'
import { CalendarTaskCard } from './CalendarTaskCard'

export const DateTaskCards = ({ date, todos }) => {

    return (
        <div className="calendar__tasksDay">
            <h1>{date}</h1>

            <div className="calendar__tasksDayCards">

                {
                    todos.map(todo => {

                        if (todo.dueDate === date) {
                            return <CalendarTaskCard key={todo.id} todo={todo} />
                        } else {
                            return null
                        }
            
                    })
                }

            </div>
        </div>
    )
}
