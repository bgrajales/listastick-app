import React, { createContext, useEffect, useReducer } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { HomeScreen } from '../components/app/HomeScreen';
import { StatsScreen } from '../components/app/StatsScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { LandingScreen } from '../components/landing/LandingScreen';
import { loginReducer } from '../reducers/loginReducer';
import { DashboardRouter } from './DashboardRouter';

const initialState = {
    isAuthenticated: false,
    user: null,
    role: null,
    token: null
}

export const AuthContext = createContext();

export const AppRouter = () => {

    const [state, dispatch] = useReducer(loginReducer, initialState)

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'));
        const role = localStorage.getItem('role')
        const token = localStorage.getItem('token')
        
        if (user && token) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                    role,
                    token
                }
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <Router>
                <div>
                    <Routes>
                        <Route index element={<LandingScreen />} />

                        <Route path="/auth">
                            <Route path="login" element={<LoginScreen />} />
                            <Route path="register" element={<RegisterScreen />} />
                        </Route>

                        <Route path="/app/*" element={ <DashboardRouter /> } />
                        
                    </Routes>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}
