import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import authImages from '../../assets/images/auth/index'
import icons from '../../assets/icons/index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { AuthContext } from '../../routers/AppRouter'
import { userLogin } from '../../actions/users';

export const LoginScreen = () => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState(false)

    let data = {
        email: '',
        password: '',
        token: '',
        isSubmitting: false,
        errorMessage: ''
    }
    
    const [formValues, handleInputChange ] = useForm(data)

    const handleFormSubmit = (e) => {
        e.preventDefault()

        setLoginError(false)

        data = ({
            ...formValues,
            isSubmitting: true,
            errorMessage: null
        })

        const user = {
            email: data.email,
            password: data.password,
            token: data.token
        }

        userLogin( user, dispatch, navigate, setLoginError, data )

}

    return (
        <main className="auth__main">
        <div className="auth_sub-div container-md">

            <div className="auth__imageDiv flex-1">
                <img className="auth__image" src={ authImages.authImage } alt="" />
            </div>

            <div className="auth__formDiv flex-1 shadow-lg">
                <div className="auth__topTextDiv">
                    <Link to="/"><img className="auth__goBackArrow" src={ icons.backIconBlack } alt="" /></Link>
                    <div>
                        <img className="auth__authLogo" src={ authImages.logo } alt="" />
                    </div>
                    <div>
                        <h3>Welcome to Listastick!</h3>
                    </div>
                </div>

                

                <form onSubmit={handleFormSubmit} className="auth__form">
                    {
                        loginError &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">Invalid credentials</Alert>
                        </Stack>
                    }
                    

                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        className="form-control" 
                        name="email" 
                        vaule={formValues.email} 
                        onChange={handleInputChange}
                        {
                            ...(loginError && { error: true })
                        }
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        className="form-control" 
                        name="password" 
                        value={formValues.password} 
                        onChange={handleInputChange}
                        {
                            ...(loginError && { error: true })
                        }
                    />

                    <button className="btn btn-primary btn-block">
                        {
                            data.isSubmitting
                            ? <AiOutlineLoading3Quarters className="app__loadingIcon" /> 
                            : 'Login'
                        }
                    </button>
                </form>

                <div className="auth__dontHaveDiv">
                    <p>Don't have an account?</p>
                    <Link to="/auth/register" className="btn btn-secondary btn-block">Create new account</Link>
                </div>

            </div>

        </div>
        </main>
    )
}
