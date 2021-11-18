import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {

    const token = localStorage.getItem('token');

    console.log(!!token)
    return !!token
        ? <Navigate to="/app/home" />
        : children
}