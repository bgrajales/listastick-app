import { Route, Routes } from "react-router"

import { LoginScreen } from "../components/auth/LoginScreen"
import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LandingScreen } from "../components/landing/LandingScreen"

export const AuthRouter = () => {
    return (
        <>
            <Routes>

                <Route index element={<LandingScreen />} />
                <Route path="auth/login" element={<LoginScreen />} />
                <Route path="auth/register" element={<RegisterScreen />} />
                
            </Routes>
        </>
    )
}
