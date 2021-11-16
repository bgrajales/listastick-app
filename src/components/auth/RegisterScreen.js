import React from 'react'

import authImages from '../../assets/images/auth/index'
import icons from '../../assets/icons/index'
import { useNavigate } from 'react-router'

export const RegisterScreen = () => {

    const navigate = useNavigate()  

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
                  <h3>Welcome to Listastick!</h3>
                </div>
              </div>

              <form>
        
                <label className="form-label">Email</label>
                <input type="email" placeholder="jhondoe@gmail.com" className="form-control" />
                    
                <label className="form-label">Full Name</label>
                <input type="text" placeholder="Jhon Doe" className="form-control" />
                
                <label className="form-label">Password</label>
                <input type="password" placeholder="Type your 8 characters password here" className="form-control" />
                
                <label className="form-label">Repeat Password</label>
                <input type="password" placeholder="Repeat your password here" className="form-control" />
                
                <button className="btn btn-primary btn-block">Sign Up</button>
              </form>
              
            </div>
        </div>
        </main>
    )
}
