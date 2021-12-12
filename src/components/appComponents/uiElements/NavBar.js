import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import icons from '../../../assets/icons/index'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FiSettings } from 'react-icons/fi';

import { AddNewTask } from '../modals/AddNewTask'
import { NavBarCalendar } from '../modals/NavBarCalendar'
import { ProfileModal } from '../modals/ProfileModal'

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
            </div>

            <OverlayTrigger placement="right" delay={{ show: 50, hide: 250 }}
                overlay={ <Tooltip id="button-tooltip-2" className="nav__toolTip">Settings</Tooltip> }
            >
            <div className="nav__iconAndText" onClick={ handleProfileClick }>
                {/* <img className="nav__pfp" src={ icons.pfp } alt="Profile" /> */}
                <FiSettings style={{ width: "50%", height: "100%", color: "white" }}/>
            </div>
            </OverlayTrigger>

            {
                modal === 'addNew' 
                ? <AddNewTask show={(modal === 'addNew') ? true : false} setModal={ setModal }/>
                : modal === 'calendar' 
                ? <NavBarCalendar show={(modal === 'calendar') ? true : false} setModal={ setModal }/>
                : modal === 'profile'
                ? <ProfileModal show={(modal === 'profile') ? true : false} setModal={ setModal }/>
                : null
            }
           
        </nav>
    )
}
