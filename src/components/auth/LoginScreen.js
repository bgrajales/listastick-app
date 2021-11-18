import React, { useContext } from 'react'

import authImages from '../../assets/images/auth/index'
import icons from '../../assets/icons/index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { AuthContext } from '../../routers/AppRouter'
import { apiUrl } from '../../utils/apiUrl'

export const LoginScreen = () => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

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

        data = ({
            ...formValues,
            isSubmitting: true,
            errorMessage: null
        })

        fetch(apiUrl('login'), {

            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                token: data.token
            })

        }).then(res => {

            if (res.ok) {
                return res.json()
            } 
            
            throw res
            
        }).then(data => {
            dispatch({
                type: 'LOGIN',
                payload: data
            })

            navigate('/app/home')
        }).catch(err => {
            console.log(err)

            data = ({
                ...data,
                isSubmitting: false,
                errorMessage: 'Crendenciales Invalidas'
        })
    }
    )}

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

                <form onSubmit={handleFormSubmit}>
                    <label className="form-label">Email</label>
                    <input type="email" placeholder="jhondoe@gmail.com" className="form-control" name="email" vaule={formValues.email} onChange={handleInputChange}/>
                

                    <label className="form-label">Password</label>
                    <input type="password" placeholder="Type your password here" className="form-control" name="password" value={formValues.password} onChange={handleInputChange}/>
                
                    <button className="btn btn-primary btn-block">Log In</button>
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
