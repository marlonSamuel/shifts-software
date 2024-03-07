import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext';
import { DefaultPage } from './DefaultPage';
import { ViewPage } from './view_screen/ViewPage';
import { TicketPage } from './ticket_screen/TicketPage';
import { ServicePage } from './service_screen/ServicePage';

export const OptionScreenPage = () => {
  const {logged, logout, user} = useContext(AuthContext);

  const showScreen = () => {
    if(user?.role == "pantalla"){
        return <ViewPage />
    }
    if(user?.role == "servicio"){
        return <ServicePage />
    }
    if(user?.role == "imprimir"){
        return <TicketPage />
    }
    return <DefaultPage />
  }

  return (
    <div style={{backgroundColor: '#fafafa', minHeight: '100vh'}}>
        {showScreen()}
    </div>
  )
}
