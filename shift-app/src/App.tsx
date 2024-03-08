import React from 'react';
import { DefaultPage } from './pages/DefaultPage';
import { LoginPage } from './pages/LoginPage';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { UIProvider } from './context/UIContext';
import { OptionScreenPage } from './pages/OptionScreenPage';
import { SocketProvider } from './context/SocketContext';
import { ShiftProvider } from './context/shift/ShiftContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <UIProvider>
        <ShiftProvider>
          <SocketProvider>
              <OptionScreenPage />
          </SocketProvider>
        </ShiftProvider>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
