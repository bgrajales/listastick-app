import React from 'react'
import { IoMdClose } from 'react-icons/io'

export const NavBarCalendar = ({ show, setModal }) => {

    const handleCloseClick = () => {
        setModal('none')
    }

    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
             <IoMdClose className="nav__closeModal" onClick={ handleCloseClick }/>
        </div>
    )
}
