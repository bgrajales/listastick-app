import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

    const token = localStorage.getItem('token');

    console.log(!!token)
    return !!token
        ? children
        : <Navigate to="/" />
}