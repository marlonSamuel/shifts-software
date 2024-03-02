import React from 'react';
import { DefaultPage } from './pages/DefaultPage';
import { LoginPage } from './pages/LoginPage';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { UIProvider } from './context/UIContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <DefaultPage />
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
