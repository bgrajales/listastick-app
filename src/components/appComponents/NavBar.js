import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../../assets/icons/index'

import { AddNewTask } from './modals/AddNewTask'
import { NavBarCalendar } from './modals/NavBarCalendar'
import { NavBarLists } from './modals/NavBarLists'

export const NavBar = () => {

    const [modal, setModal] = useState('none')

    const handleAddNewClick = () => {
        setModal('addNew')
    }

    const handleCalendarClick = () => {
        setModal('calendar')
    }

    const handleListsClick = () => {
        setModal('lists')
    }

    return (
        <nav className="nav__desktopNavBar">
            <div className="nav__desktopBtns">
                <div className="nav__iconAndText" onClick={ handleAddNewClick }>
                    <img className="nav__BtnIcon" src={ icons.circlePlusIcon } alt="Add new task" />
                </div>
                <div className="nav__iconAndText">
                    <Link to="/app/home"><img className="nav__BtnIcon" src={ icons.homeIcon } alt="Home page" /></Link>
                </div>
                <div className="nav__iconAndText">
                    <Link to="/app/stats"><img className="nav__BtnIcon" src={ icons.statsIcon } alt="Stats page" /></Link>
                </div>
                <div className="nav__iconAndText" onClick={ handleCalendarClick }>
                    <img className="nav__BtnIcon" src={ icons.calendarIcon } alt="Calendar modal" />
                </div>
                <div className="nav__iconAndText" onClick={ handleListsClick }>
                    <img className="nav__BtnIcon" src={ icons.listIcon } alt="List modal" />
                </div>
            </div>

            <div className="nav__iconAndText">
                <img className="nav__pfp" src={ icons.pfp } alt="Profile" />
            </div>

            <AddNewTask show={(modal === 'addNew') ? true : false}/>
            <NavBarCalendar show={(modal === 'calendar') ? true : false}/>
            <NavBarLists show={(modal === 'lists') ? true : false}/>
        </nav>
    )
}
