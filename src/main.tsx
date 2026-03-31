import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './app/globals.css'; // Maintaining the Zeta global styles 🛰️
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { ThemeProvider } from '@/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AccessibilityProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AccessibilityProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
