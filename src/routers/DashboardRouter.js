import { useContext } from 'react'
import { Route, Routes } from "react-router"

import { HomeScreen } from "../components/app/HomeScreen"
import { StatsScreen } from "../components/app/StatsScreen"
import { NavBar } from '../components/appComponents/uiElements/NavBar'
import { AuthContext } from "../routers/AppRouter"

export const DashboardRouter = () => {

    const { state: authState } = useContext(AuthContext)
   
    if (authState.isAuthenticated) {
        (authState.user.settings && authState.user.settings.theme === 'dark') 
            ? document.documentElement.setAttribute("data-theme", 'dark') 
            : document.documentElement.setAttribute("data-theme", 'light')
    } else {
        document.documentElement.setAttribute("data-theme", 'light')
    }

    return (
        <>
            <NavBar />

            <Routes>

                <Route path="home" element={<HomeScreen />} />
                <Route path="stats" element={<StatsScreen />} />
                
            </Routes>
        </>
    )
}
