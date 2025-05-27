import { ActionIcon, Avatar, Divider, FileInput, Indicator, Overlay, TagsInput, Textarea } from "@mantine/core";
import {  IconBriefcase, IconDeviceFloppy, IconEdit, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";


import { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certficate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { SuccessNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";




  const Profile = () =>{
    const dispatch=useDispatch();
    const user = useSelector((state:any)=>state.user);
    const profile = useSelector((state:any)=>state.profile); 
    
      
    const {hovered , ref} =useHover();
    const handleFileChange =async (image:any) =>{
      let picture:any = await getBase64(image);
      let updatedProfile = {...profile , picture:picture.split(',')[1]};
      dispatch(changeProfile(updatedProfile));
      SuccessNotification("Success" , "Profile picture changed Successfully ");
    }
    
  return <div className="w-4/5 mx-auto lg-mx:w-full">
    <div className=" ">
    <div className="relative px-5">
        <img className="rounded-t-2xl xs-mx:h-38" src="/profile/banner.jpg" alt="" />
        <div ref={ref} className="absolute flex items-center justify-center rounded-full 
         -bottom-1/3 left-6 md:-bottom-10 sm:-bottom-16 cursor-pointer">
          
            <Avatar className="!w-48 !h-48 md:!w-40 md:!h-40 border-mine-shaft-950 border-8 rounded-full sm:!w-36 sm:!h-36 xs-mx:!h-32 xs-mx:!w-32"

            src={profile.picture?
              `data:image/jpeg;base64,${profile.picture}`:
              "/avatar.png" }
             alt="" />


            {hovered && <Overlay color="" backgroundOpacity={0.75} className="!rounded-full" />}
            {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
            
            {hovered && <FileInput className="absolute w-full z-[301] !h-full
            [&_*]:!h-full [&_*]:!rounded-full
            " 
            variant="transparent" onChange={handleFileChange}
              accept="image/png,image/jpeg" /> }

              
            
        </div>
        </div>
    
          <div className="px-4 mt-20 ">
              <Info />
        </div>      
              <Divider  my='xl' />
              <About />
          <Divider mx='xs' my='xl' />

              <Skills />
            
          <Divider mx='xs' my='xl' />
            <Experience />
          <Divider mx='xs' my='xl' />
          <Certficate />
</div>
</div>

  
}
export default Profile;