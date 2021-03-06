import React, { createContext, useEffect, useReducer } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { loginReducer } from '../reducers/loginReducer';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Forbidden } from "../components/auth/Forbidden"

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
}

export const AuthContext = createContext();

export const AppRouter = () => {

    const [state, dispatch] = useReducer(loginReducer, initialState)

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (user && token) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                    token,
                    refreshToken
                }
            })
        }

    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <Router>
                <div>
                    <Routes>

                        <Route path="/*" element={
                            <PublicRoute>
                                <AuthRouter />
                            </PublicRoute>
                        }/>

                        <Route path="/app/*" element={
                            <PrivateRoute>
                                <DashboardRouter />
                            </PrivateRoute>
                        }/>

                        <Route path="/forbidden" element={<Forbidden />} />
                        
                    </Routes>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}
