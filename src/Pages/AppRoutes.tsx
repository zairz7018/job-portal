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
import PublicRoute from '../Services/PublicRoute';
import ProtectedRoute from '../Services/ProtectedRoute';

const AppRoutes = ()=>{
  const user = useSelector((state:any)=>state.user);
  return <BrowserRouter>
      
  <div className='relative'>
  <Header/>
  <Divider size="xs"  mx="md" />
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/find-jobs' element={<FindJobs />} />
    <Route path='/find-talent' element={<FindTalentPage /> } />
    <Route path='/company/:name' element={<CompanyPage />} />
    <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['Employer']}><PostedJobPage /></ProtectedRoute>} />
    <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['Employer']}><PostJobPage /></ProtectedRoute>} />
    <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage /></ProtectedRoute>} />
    <Route path='/Jobs/:id' element={<JobDescPage />} />
    <Route path='/apply-job/:id' element={<ApplyJobPage />} />
    <Route path='/talent-profile/:id' element={<TalentProfilePage />} />
    <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute>   } />
    <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
    <Route path='/profile' element={ <ProfilePage />} />
    <Route path='*' element={<HomePage />} />
  </Routes>
  <Footer />
  </div>
  </BrowserRouter>
}
export default AppRoutes;