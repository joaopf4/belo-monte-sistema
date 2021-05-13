
import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes/>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
