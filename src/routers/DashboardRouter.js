import { useContext } from 'react'
import { Route, Routes } from "react-router"

import { HomeScreen } from "../components/app/HomeScreen"
import { StatsScreen } from "../components/app/StatsScreen"
import { NavBar } from "../components/appComponents/NavBar"
import { AuthContext } from "../routers/AppRouter"

export const DashboardRouter = () => {

    const { state: authState } = useContext(AuthContext)
   
    console.log(authState)

    if (authState.isAuthenticated) {
    (authState.settings && authState.settings.theme === 'dark') 
        ? document.documentElement.setAttribute("data-theme", 'dark') 
        : document.documentElement.setAttribute("data-theme", 'light')
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
