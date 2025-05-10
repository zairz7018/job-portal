import { Divider } from '@mantine/core';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import FindJobs from './FindJobs';
import CompanyPage from './CompanyPage';
import PostedJobPage from './PostedJobPage';
import PostJobPage from './PostJobPage';
import JobHistoryPage from './JobHistoryPage';
import JobDescPage from './JobDescPage';
import ApplyJobPage from './ApplyJobPage';
import TalentProfilePage from './TalentProfilePage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import Footer from '../Footer/Footer';
import FindTalentPage from './FindTalentPage';
import { useSelector } from 'react-redux';

const AppRoutes = ()=>{
  const user = useSelector((state:any)=>state.user);
  return <BrowserRouter>
      
  <div className='relative'>
  <Header/>
  <Divider size="xs"  mx="md" />
  <Routes>
    <Route path='/find-jobs' element={<FindJobs />} />
    <Route path='/find-talent' element={<FindTalentPage />} />
    <Route path='/company/:name' element={<CompanyPage />} />
    <Route path='/posted-jobs/:id' element={<PostedJobPage />} />
    <Route path='/post-job' element={<PostJobPage />} />
    <Route path='/job-history' element={<JobHistoryPage />} />
    <Route path='/Jobs/:id' element={<JobDescPage />} />
    <Route path='/apply-job/:id' element={<ApplyJobPage />} />
    <Route path='/talent-profile' element={<TalentProfilePage />} />
    <Route path='/signup' element={user?<Navigate to="/" />:<SignUpPage />} />
    <Route path='/login' element={user?<Navigate to="/" />:<SignUpPage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/' element={<HomePage />} />
  </Routes>
  <Footer />
  </div>
  </BrowserRouter>
}
export default AppRoutes;