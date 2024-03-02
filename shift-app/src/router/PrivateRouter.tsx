import React from 'react'
import { Navigate } from 'react-router-dom';

type props = {
    isAuthenticated: boolean,
    children: any
}

export const PrivateRouter = ({ isAuthenticated, children }: props) => {
    console.log('private: ',isAuthenticated);
    return isAuthenticated ? <Navigate to="/" /> : children;
}