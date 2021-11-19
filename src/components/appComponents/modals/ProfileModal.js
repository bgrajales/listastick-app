import React, { useContext } from 'react'
import { IoMdClose } from 'react-icons/io'

import { AuthContext } from '../../../routers/AppRouter'

export const ProfileModal = ({ show, setModal }) => {
    
    const { state: authState } = useContext(AuthContext)
    const { dispatch } = useContext(AuthContext)

    if (!show) {
        return null
    }
    
    const handleCloseClick = () => {
        setModal('none')
    }

    const handleLogOut = () => {
        dispatch({ 
            type: 'LOGOUT'
        })
    }

    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>

            <IoMdClose className="nav__closeModal" onClick={ handleCloseClick }/>

            <div className="nav__expandedProfile">

                <div className="nav__profilePfpAndData">
                
                    <h3>{ authState.user.name }</h3>

                    <h5>{ authState.user.email }</h5>

                </div>

                <div className="nav__configSubDiv">
                 <button className="btn btn-danger btn-block" onClick={ handleLogOut }>Log out</button>
                </div>
            </div>
        </div>
    )
}
