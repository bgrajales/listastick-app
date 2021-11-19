import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import icons from '../../assets/icons/index'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { AddNewTask } from './modals/AddNewTask'
import { NavBarCalendar } from './modals/NavBarCalendar'
import { ProfileModal } from './modals/ProfileModal'

export const NavBar = () => {

    const [modal, setModal] = useState('none')

    const handleAddNewClick = () => {
        setModal('addNew')
    }

    const handleCalendarClick = () => {
        setModal('calendar')
    }

    const handleProfileClick = () => {
        setModal('profile')
    }

    // const handleListsClick = () => {
    //     setModal('lists')
    // }

    return (
        <nav className="nav__desktopNavBar">
            <div className="nav__desktopBtns">
                <OverlayTrigger placement="right" delay={{ show: 50, hide: 250 }}
                    overlay={ <Tooltip id="button-tooltip-2" className="nav__toolTip">Add new</Tooltip> }
                >
                <div className="nav__iconAndText" onClick={ handleAddNewClick }>
                    <img className="nav__BtnIcon" src={ icons.circlePlusIcon } alt="Add new task" />
                </div>
                </OverlayTrigger>

                <OverlayTrigger placement="right" delay={{ show: 50, hide: 250 }}
                    overlay={ <Tooltip id="button-tooltip-2" className="nav__toolTip">Home</Tooltip> }
                >
                <div className="nav__iconAndText">
                    <NavLink to="/app/home" className={({ isActive }) => `${isActive ? 'nav__active' : ''}`}><img className="nav__BtnIcon" src={ icons.homeIcon } alt="Home page" /></NavLink>
                </div>
                </OverlayTrigger>

                <OverlayTrigger placement="right" delay={{ show: 50, hide: 250 }}
                    overlay={ <Tooltip id="button-tooltip-2" className="nav__toolTip">Stats</Tooltip> }
                >
                <div className="nav__iconAndText">
                    <NavLink to="/app/stats" className={({ isActive }) => `${isActive ? 'nav__active' : ''}`}><img className="nav__BtnIcon" src={ icons.statsIcon } alt="Stats page" /></NavLink>
                </div>
                </OverlayTrigger>

                <OverlayTrigger placement="right" delay={{ show: 50, hide: 250 }}
                    overlay={ <Tooltip id="button-tooltip-2" className="nav__toolTip">Calendar</Tooltip> }
                >
                <div className="nav__iconAndText" onClick={ handleCalendarClick }>
                    <img className="nav__BtnIcon" src={ icons.calendarIcon } alt="Calendar modal" />
                </div>
                </OverlayTrigger>
                {/* <div className="nav__iconAndText" onClick={ handleListsClick }>
                    <img className="nav__BtnIcon" src={ icons.listIcon } alt="List modal" />
                </div> */}
            </div>

            <OverlayTrigger placement="right" delay={{ show: 50, hide: 250 }}
                overlay={ <Tooltip id="button-tooltip-2" className="nav__toolTip">Profile</Tooltip> }
            >
            <div className="nav__iconAndText" onClick={ handleProfileClick }>
                <img className="nav__pfp" src={ icons.pfp } alt="Profile" />
            </div>
            </OverlayTrigger>

            <AddNewTask show={(modal === 'addNew') ? true : false} setModal={ setModal }/>
            <NavBarCalendar show={(modal === 'calendar') ? true : false} setModal={ setModal }/>
            <ProfileModal show={(modal === 'profile') ? true : false} setModal={ setModal }/>
            {/* <NavBarLists show={(modal === 'lists') ? true : false} setModal={ setModal }/> */}
            {/* Profile modal */}
        </nav>
    )
}
