import React, { useContext } from 'react'

import authImages from '../../assets/images/auth/index'
import icons from '../../assets/icons/index'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../routers/AppRouter'
import { useForm } from '../../hooks/useForm'
import { apiUrl } from '../../utils/apiUrl'


export const RegisterScreen = () => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()  

    let data = {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
      isSubmitting: false,
      errorMessage: null
    }

    const [ formValues, handleInputChange ] = useForm(data)

    const handleRegisterForm = (e) => {
      e.preventDefault()
      
      data = ({
        ...formValues,
        isSubmitting: true,
        errorMessage: null
      })
      
      console.log(data)
      fetch(apiUrl('register'), {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })

      }).then(res => {
        console.log(res)
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      }).then(data => {
        dispatch({
          type: 'LOGIN',
          payload: data
        })
        navigate('/app/home')
      }).catch(err => {
        console.log(err)
        data = ({
          ...formValues,
          isSubmitting: false,
          errorMessage: 'No se pudo crear el usuario'
        })
      })
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

              <form onSubmit={ handleRegisterForm }>
        
                <label className="form-label">Email</label>
                <input type="email" placeholder="jhondoe@gmail.com" className="form-control" name="email" onChange={ handleInputChange } value={ formValues.email }/>
                    
                <label className="form-label">Full Name</label>
                <input type="text" placeholder="Jhon Doe" className="form-control" name="name" onChange={ handleInputChange } value={ formValues.name } />
                
                <label className="form-label">Password</label>
                <input type="password" placeholder="Type your 8 characters password here" className="form-control" name="password" onChange={ handleInputChange } value={ formValues.password } />
                
                <label className="form-label">Repeat Password</label>
                <input type="password" placeholder="Repeat your password here" className="form-control" name="repeatPassword" onChange={ handleInputChange } value={ formValues.repeatPassword }/>
                
                <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
              </form>
              
            </div>
        </div>
        </main>
    )
}
