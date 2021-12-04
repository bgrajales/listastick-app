import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import authImages from '../../assets/images/auth/index'
import icons from '../../assets/icons/index'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../routers/AppRouter'
import { useForm } from '../../hooks/useForm'
import { userRegister } from '../../actions/users';


export const RegisterScreen = () => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()  
    
    const [registerError, setRegisterError] = useState(false)
    const [ loading, setLoading ] = useState({
      status: false,
      message: ''
    })

    let data = {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
    }

    const [ formValues, handleInputChange ] = useForm(data)

    const handleRegisterForm = (e) => {
      e.preventDefault()

      setRegisterError(false)
      setLoading({
        status: true,
        message: ''
      })

      data = ({
        ...formValues,
      })
      
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword
      }

      userRegister( user, dispatch, navigate, setRegisterError, setLoading )

    }

    return (
        <main className="auth__main">
        <div className="auth_sub-div container-md">
          
          <div className="auth__imageDiv flex-1">
            <img className="auth__image" src={ authImages.authImage } alt="" />
          </div>

            <div className="auth__formDiv flex-1 shadow-lg">
              <div className="auth__topTextDiv">
                <img onClick={() => navigate(-1)} className="auth__goBackArrow" src={ icons.backIconBlack } alt="" />
                <div>
                  <img className="auth__authLogo" src={ authImages.logo } alt="" />
                </div>
                <div>
                  <h3>Welcome to Listastick!</h3>
                </div>
              </div>

              <form onSubmit={ handleRegisterForm } className="auth__form">
        
              {
                registerError &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{loading.message}</Alert>
                </Stack>
              }
              
              <TextField 
                        label="Email"
                        type="email"
                        variant="outlined" 
                        className="form-control" 
                        name="email" 
                        onChange={ handleInputChange } 
                        value={ formValues.email }
                        {
                            ...(registerError && { error: true })
                        }
                />
              <TextField 
                        label="Full Name" 
                        type="text"
                        variant="outlined" 
                        className="form-control" 
                        name="name" 
                        onChange={ handleInputChange } 
                        value={ formValues.name }
                        {
                            ...(registerError && { error: true })
                        }
                />
              <TextField 
                        label="Password" 
                        type="password"
                        variant="outlined" 
                        className="form-control" 
                        name="password" 
                        onChange={ handleInputChange } 
                        value={ formValues.password }
                        {
                            ...(registerError && { error: true })
                        }
                />
              <TextField 
                        label="Repeat Password" 
                        type="password"
                        variant="outlined" 
                        className="form-control" 
                        name="repeatPassword" 
                        onChange={ handleInputChange } 
                        value={ formValues.repeatPassword }
                        {
                            ...(registerError && { error: true })
                        }
                />            
                        
                <button className="btn btn-primary btn-block" type="submit">
                  {
                    loading.status
                    ? <AiOutlineLoading3Quarters className="app__loadingIcon" /> 
                    : 'Register'
                  }
                </button>
              </form>
              
            </div>
        </div>
        </main>
    )
}
