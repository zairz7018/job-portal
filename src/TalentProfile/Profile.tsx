import {  Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";
// import { profile } from "../Data/TalentData";


const Profile = (props:any) =>{
  const {id} = useParams();
  const matches = useMediaQuery("(max-width: 475px)");
  const [profile , setProfile] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0,0);
    getProfile(id).then((res)=>{

      setProfile(res);
    }).catch((err) =>{
      console.log(err);
    })
  } , [id])
  return <div className="w-2/3 lg-mx:w-full">
      <div className="relative">
          {/* <img className="rounded-t-2xl" src="/profile/banner.jpg" alt="" /> */}
          <img className="rounded-t-2xl w-full xs-mx:h-38 xl-mx:h-40" src="/profile/banner.jpg" alt="" />
                  <div className="absolute flex items-center justify-center rounded-full 
                   -bottom-1/3  left-6 md:-bottom-10 sm:-bottom-16 cursor-pointer">   
                      <Avatar className="!w-48 !h-48 md:!w-40 md:!h-40 border-mine-shaft-950 border-8 rounded-full sm:!w-36 sm:!h-36 xs-mx:!h-32 xs-mx:!w-32"
          
                      src={profile?.picture?
                        `data:image/jpeg;base64,${profile?.picture}`:
                        "/avatar.png" }
                       alt="" />
          </div>
          </div>
      
          <div className="px-3 mt-16">
              <div className="text-3xl font-semibold flex justify-between xs-mx:text-2xl">  {profile?.name}
                <Button color="brightSun.4" variant="light" size={matches ? "sm" : "md"}  >Message </Button>
              </div>
              <div className="text-xl flex gap-1 items-center xs-mx:text-base"> <IconBriefcase className="h-5 w-5" stroke={1.5}  />{profile?.jobTitle} &bull; {profile?.company}</div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300 xs-mx:text-base">
                <IconMapPin className="h-5 w-5" stroke={1.5} />{profile?.location}
              </div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300 xs-mx:text-base">
                <IconBriefcase className="h-5 w-5" stroke={1.5} />Experience : {profile?.totalExp} Years
              </div>
          </div>
          <Divider mx='xs' my='xl' />
          <div className="px-3">
            <div className="text-2xl font-semibold mb-3">About</div>
            <div className="text-sm text-mine-shaft-300 text-justify">
            {profile?.about}
            </div>
          </div>
          <Divider mx='xs' my='xl' />
          <div className="px-3">
            <div className="text-2xl font-semibold mb-3">Skills</div>
            <div className=" flex flex-wrap gap-2">
              {
                profile?.skills?.map((skill:any , index:any) =><div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-xl text-bright-sun-800 px-3 py-1 ">{skill} </div> )
              }
              
              
            </div>
            
          </div>
          <Divider mx='xs' my='xl' />
          <div className="px-3 ">
            <div className="text-2xl font-semibold mb-5">Experience </div>
            <div className="flex flex-col gap-8">
                {
                  profile?.experiences?.map((exp:any , index:any) =><ExpCard key={index} {...exp} />)
                }
            </div>
            
          </div>
          <Divider mx='xs' my='xl' />
          <div className="px-3">
            <div className="text-2xl font-semibold mb-5">Certification </div>
                <div className="flex flex-col gap-8">
                    {
                      profile?.certifications?.map((certi:any , index:any) =><CertiCard key={index} {...certi} />)
                    }
                </div>
          </div>
</div>
  
}
export default Profile;