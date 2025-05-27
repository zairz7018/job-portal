import { Avatar, Burger, Button, Drawer, Indicator } from '@mantine/core';

import { IconAnchor, IconBell, IconSettings, IconX } from "@tabler/icons-react";
import NavLinks from './NavLinks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';
import NotiMenu from './NotiMenu';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice';
import { setupResponseInterceptor } from '../Interceptor/AxiosInterceptor';
import { useDisclosure } from '@mantine/hooks';

const Links = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job/0" },
    { name: "Posted Jobs", url: "posted-jobs/0" },
    { name: "Job History", url: "job-history" },
    // { name: "SignUp", url: "signup" }
  ];
const Header = () => {
  
  const [opened , {open , close}] = useDisclosure(false);
  const dispatch=useDispatch();
    const user = useSelector((state:any)=>state.user); 
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector((state:any)=>state.jwt)
    useEffect(()=>{
      setupResponseInterceptor(navigate);
    },[navigate])
    useEffect(() => {
      if(token && token.split('.').length === 3){
        const decoded = jwtDecode(localStorage.getItem("token")||"");
        dispatch(setUser({...decoded , email:decoded.sub}));
      }
        getProfile(user?.profileId)
          .then((res) => {
            dispatch(setProfile(res));
          })
          .catch((error) => {
            console.log(error);
          });
    }, [token , navigate]); 
  // const location = useLocation();
  return location.pathname!=="/signup" && location.pathname!="/login" ?<div className="w-full bg-mine-shaft-950 px-6 text-white flex justify-between h-28 items-center font-['poppins']">
      <div className="flex gap-1 items-center  text-bright-sun-400" >

      <IconAnchor stroke={2.5}  className=" h-8 w-8"/>
      <div className="text-3xl font-semibold xs-mx:hidden">EliteHire</div>
        
      </div>

      {NavLinks()} 
      
      <div className="flex gap-5 items-center">
      
      
        
        {user ? <ProfileMenu /> : <Link to="/login">
          <Button  variant='subtle' color='brightSun.4'>Login</Button>
        </Link> 
        }
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
        <IconSettings stroke={1.5} />
        </div> */}
        {
          user ? <NotiMenu /> : <></>
        }
        {
          
        }
        <Burger className='bs:hidden' opened={opened} onClick={open} aria-label='Toogle navigation' />
        <Drawer size='xs' overlayProps={{backgroundOpacity:0.5 , blur: 4}} position='right'
        closeButtonProps={{icon: <IconX  size={30} />}}
         opened={opened} onClose={close} >

          <div className='flex flex-col gap-6 items-center'>
             {Links.map((link, index) => (
        <div
          key={index}
          className="h-full flex items-center "
        >
          <Link className='hover:text-bright-sun-400 text-xl' key={index} to={link.url}>{link.name}</Link>
        </div>
      ))}
          </div>
      </Drawer>
        
      
      </div>
      
      
    </div>: <></>
  
}
export default Header;