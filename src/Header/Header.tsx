import { Avatar, Button, Indicator } from '@mantine/core';

import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';
import NotiMenu from './NotiMenu';

const Header = () => {
  const dispatch=useDispatch();
    const user = useSelector((state:any)=>state.user); 
    
    useEffect(() => {
        getProfile(user?.profileId)
          .then((res) => {
            dispatch(setProfile(res));
          })
          .catch((error: any) => {
            console.log(error);
          });
    }, []); 
  const location = useLocation();
  return location.pathname!=="/signup" && location.pathname!="/login" ?<div className="w-full bg-mine-shaft-950 px-6 text-white flex justify-between h-28 items-center font-['poppins']">
      <div className="flex gap-1 items-center  text-bright-sun-400" >

      <IconAnchor stroke={2.5} className="h-8 w-8"/>
      <div className="text-3xl font-semibold">JobHook</div>
        
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
        
      
      </div>
      
      
    </div>: <></>
  
}
export default Header;