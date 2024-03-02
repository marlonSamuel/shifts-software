import React from 'react'
import { Navigate } from 'react-router-dom';

type props = {
    isAuthenticated: boolean,
    children: any
}

export const PublicRouter = ({ isAuthenticated, children }: props) => {
    console.log('public: ',isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
}
