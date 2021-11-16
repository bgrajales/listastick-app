import { Route, Routes } from "react-router"
import { HomeScreen } from "../components/app/HomeScreen"
import { StatsScreen } from "../components/app/StatsScreen"
import { NavBar } from "../components/appComponents/NavBar"

export const DashboardRouter = () => {
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
