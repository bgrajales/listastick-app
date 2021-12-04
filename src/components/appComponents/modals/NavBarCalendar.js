import React, { useContext, useEffect, useReducer, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Calendar from 'react-calendar';
import { format, lastDayOfMonth, subMonths } from 'date-fns';

import { todosReducer } from '../../../reducers/todosReducer'
import { AuthContext } from '../../../routers/AppRouter';
import { addDays } from 'date-fns/esm';
import { DateTaskCards } from '../uiElements/DateTaskCards';
import { fetchCalendarTodos } from '../../../actions/todos';

const initialState = {
    todos: [],
    isFetching: true,
    hasError: false,
}

const initialDates  = {
    startDate: format(addDays(lastDayOfMonth(subMonths(new Date(), 1)), 1), 'yyyy-MM-dd'),
    endDate: format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')
}

export const NavBarCalendar = ({ show, setModal }) => {

    const handleCloseClick = () => {
        setModal('none')
    }

    const { state: authState } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(todosReducer, initialState)
    
    const [ calendarDates, setCalendarDates] = useState(initialDates)
    const [ currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'))

    const handleCalendarChange = ( activeStartDate ) => {
        setCalendarDates({
            startDate: format(activeStartDate, 'yyyy-MM-dd'),
            endDate: format(lastDayOfMonth(activeStartDate), 'yyyy-MM-dd')
        })
    }

    useEffect(() => {
        if (authState.token) {
            dispatch({ type: 'FETCH_TODOS_REQUEST' })

            fetchCalendarTodos( calendarDates.startDate, calendarDates.endDate, authState.token, dispatch )
        }
    }, [authState.token, calendarDates, dispatch])

    const handleCalendarDayIndicator = ( date ) => {
        const todos = state.todos
        const thisDate = format(date, 'yyyy-MM-dd')

        const includes = todos.some(todo => todo.dueDate === thisDate)
        
        if (includes) {
            return (<div className="calendar__taskOnDay"></div>)
        } else {
            return ''
        } 
    
    }

    const handleDayClick = ( date ) => {
        setCurrentDate(format(date, 'yyyy-MM-dd'))
    }

    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
             <IoMdClose className="nav__closeModal" onClick={ handleCloseClick }/>

            <div className="nav__expandedCalendar">
                <Calendar
                    onClickDay={ (date) => handleDayClick(date) }
                    onActiveStartDateChange={ ({activeStartDate}) =>  handleCalendarChange(activeStartDate) }
                    maxDetail="month"
                    minDetail="month"
                    showNeighboringMonth={false}
                    
                    defaultValue={new Date()}
                    tileContent={({ date }) => (handleCalendarDayIndicator( date ))}
                />

                <DateTaskCards date={currentDate} todos={state.todos}/>
            </div>
        </div>
    )
}
