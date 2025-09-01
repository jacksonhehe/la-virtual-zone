import React from 'react';
import Home from './pages/Home';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Home />
      </DataProvider>
    </AuthProvider>
  );
}
