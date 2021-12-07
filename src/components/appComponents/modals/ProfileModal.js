import React, { useContext } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { AuthContext } from '../../../routers/AppRouter'
import { changeUserSettings } from '../../../actions/users'


export const ProfileModal = ({ show, setModal }) => {
    
    const MySwal = withReactContent(Swal)
    const { state: authState, dispatch } = useContext(AuthContext)

    if (!show) {
        return null
    }
    
    const handleCloseClick = () => {
        setModal('none')
    }

    const handleLogOut = () => {

        MySwal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.value) {
                dispatch({ type: 'LOGOUT' })
                setModal('none')
            }
        })
    
    }

    const handleThemeChange = (setTheme) => {

        const newSettings = {
            name: authState.user.name,
            email: authState.user.email,
            mfaEnabled: authState.user.mfaEnabled || false,
            settings: {
                ...authState.user.settings,
                theme: setTheme
            }
        }

        changeUserSettings( authState.token, authState.user.id, newSettings, dispatch  )

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
                    <h4>App theme</h4>
                    <div className="btn-group btn-block">
                        <input type="radio" className="btn-check" />
                        <label className={`btn ${(authState.user.settings && authState.user.settings.theme === 'light') ? 'btn-primary' : 'btn-outline-primary'}`} onClick={ () => handleThemeChange('light') }>
                            <BsFillSunFill />
                        </label>
                    
                        <input type="radio" className="btn-check" />
                        <label className={`btn ${(authState.user.settings && authState.user.settings.theme === 'dark') ? 'btn-primary' : 'btn-outline-primary'}`} onClick={ () => handleThemeChange('dark') }>
                            <BsFillMoonStarsFill />
                        </label>
                    </div>
                </div>

                <div className="nav__configSubDiv">
                 <button className="btn btn-danger btn-block" onClick={ handleLogOut }>Log out</button>
                </div>
            </div>
        </div>
    )
}
