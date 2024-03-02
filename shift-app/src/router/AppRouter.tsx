import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import { DashboardPage } from '../pages/admin/DashboardPage';
import { PublicRouter } from './PublicRouter';
import { SideBarRouter } from './SideBarRouter';
import { PrivateRouter } from './PrivateRouter';
import { AuthRouter } from './AuthRouter';
import { AuthContext } from '../context/auth/AuthContext';


export const AppRouter = () => {
    //obtener estado de autenticación.
    const {logged} = useContext(AuthContext);

  return (
    <Routes>
            <Route
                path="/*"
                element={
                    <PublicRouter isAuthenticated={logged}>
                        <SideBarRouter />
                    </PublicRouter>
                }
            />

            <Route
                path="/auth/*"
                element={
                    <PrivateRouter isAuthenticated={logged}>
                        <AuthRouter />
                    </PrivateRouter>
                }
            />
            <Route path="*" element={<DashboardPage />} />
    </Routes>

  )
}
