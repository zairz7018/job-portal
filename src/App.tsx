// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { MantineProvider } from '@mantine/core';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <MantineProvider >
      <HomePage />
    </MantineProvider>
  );
}

export default App;
