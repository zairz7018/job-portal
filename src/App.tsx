// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import HomePage from './Pages/HomePage';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import FindJobs from './Pages/FindJobs';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalentPage from './Pages/FindTalentPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import JobDescPage from './Pages/JobDescPage';

function App() {
  const theme = createTheme({
    colors:{
      'brightSun': ['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20','#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902',
      ],
      'MineShaft':['#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888', '#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d','#2d2d2d',]
      

    },
    fontFamily: "Poppins, sans-serif",
    focusRing : "never",
    primaryColor: 'brightSun',
    primaryShade: 4
  });
    
  return (
    
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <BrowserRouter>
      <Header />
      <Divider size="xs"  mx="md" />
      <Routes>
        <Route path='/find-jobs' element={<FindJobs />} />
        <Route path='/find-talent' element={<FindTalentPage />} />
        <Route path='/post-job' element={<PostJobPage />} />
        <Route path='/Jobs' element={<JobDescPage />} />
        <Route path='/talent-profile' element={<TalentProfilePage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </MantineProvider>
  );
}

export default App;
