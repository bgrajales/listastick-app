import React from 'react'
import { CalendarTaskCard } from './CalendarTaskCard'
import { addDays, format } from 'date-fns';

export const DateTaskCards = ({ date, todos }) => {
    console.log(date)
    return (
        <div className="calendar__tasksDay">
            <h1>{format(addDays(new Date(date), 1), 'LLLL do yyyy')}</h1>

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
