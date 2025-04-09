// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import HomePage from './Pages/HomePage';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

function App() {
  const theme = createTheme({
    colors:{
      'brightSun': ['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20','#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902',
      ],
      'MineShaft':['#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888', '#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d','#2d2d2d'],

    }
  });
    
  return (
    
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<HomePage />} />
      </Routes>

      <HomePage />
      
            
      </BrowserRouter>
      
    </MantineProvider>
  );
}

export default App;
