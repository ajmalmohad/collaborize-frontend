import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AuthContext';

const Protected = ({ children }) => {
    const { isLoggedIn } = useAppContext();
    return (
        isLoggedIn ? <div>{ children }</div> : <Navigate to="/" />
    )
}

export default Protected