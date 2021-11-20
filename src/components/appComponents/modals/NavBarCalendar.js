import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const NavBarCalendar = ({ show, setModal }) => {

    const handleCloseClick = () => {
        setModal('none')
    }

    const [value, onChange] = useState(new Date());

    const handleCalendarDayIndicator = () => {

        return(<div className="calendar__taskOnDay"></div>)
    }

    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
             <IoMdClose className="nav__closeModal" onClick={ handleCloseClick }/>

            <div className="nav__expandedProfile">
                <Calendar
                    onChange={onChange}
                    value={value}
                    tileContent={({ date }) => (handleCalendarDayIndicator())}
                />
            </div>
        </div>
    )
}
