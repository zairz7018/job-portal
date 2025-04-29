import { ActionIcon, Avatar, Divider, FileInput, Indicator, TagsInput, Textarea } from "@mantine/core";
import {  IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

import { useEffect, useState } from "react";

import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";


const Profile = () =>{
  const dispatch=useDispatch();
  const user = useSelector((state:any)=>state.user);
  const profile = useSelector((state:any)=>state.profile); 
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const [skills , setSkills] = useState(["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS", "Tailwind CSS", "Python", "Django"]);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [about, setAbout] = useState('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi labore dolorem at impedit architecto exercitationem id, consequatur dolorum possimus cupiditate.');
  const handleEdit=(index:any)=>{
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  }
  useEffect(()=>{
    getProfile(user.id).then((data:any)=>{
      dispatch(setProfile(data));
    }).catch((error:any)=>{
      console.log(error);
    });
  }, [])
  return <div className="w-4/5 mx-auto">
    <div className="">
        <div className="relative">
        <img className="rounded-t-2xl" src="/profile/banner.jpg" alt="" />
        <div className="absolute -bottom-1/3 left-3">
          <Indicator className="[&_.mantine-Indicator-Indicator]:!border-4 [&_img]:hover:opacity-80" autoContrast 
          inline offset={30} label={<IconPencil className="w-4/5 h-4/5" />} size={45} position="bottom-end" color="brightSun.4" withBorder>
            <Avatar className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full" src="/avatar.png" alt="" />

            <FileInput className="absolute bottom-2 right-2 z-[201] w-12 [&_div]:text-transparent"
            variant="unstyled" size="lg" radius='xl' accept="image/png,image/jpeg" /> 
          </Indicator>
        </div>
        </div>
    
          <div className="px-3 mt-16">
              <Info />
        </div>      
              <Divider  my='xl' />


              <div>
                  <div className="text-2xl font-semibold mb-3 flex justify-between">About <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(1)} size='lg' >
    {edit[1]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div>
                {
                  edit[1]?<Textarea value={about} placeholder="Enter About Yourself ..." autosize minRows={3} onChange={(event)=> setAbout(event.target.value)}/> :
                  <div className="text-sm text-mine-shaft-300 text-justify">
                    {profile?.about}
                  </div>
                }
                
                  
          </div>
          <Divider mx='xs' my='xl' />
          <div >
            <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(2)} size='lg' >
    {edit[2]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div>
                {
                  edit[2]?<TagsInput value={skills} onChange={setSkills} placeholder="Add skills" splitChars={[',',' ' , '|']} 
                  />:<div className=" flex flex-wrap gap-2">
                  {
                    profile?.skills?.map((skill:any , index:number) =><div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-xl text-bright-sun-800 px-3 py-1 ">{skill} </div> )
                  }
                  
                </div>
                }
                
            
            
          </div>
          <Divider mx='xs' my='xl' />
          <div className="px-3 ">
            <div className="text-2xl font-semibold mb-4 flex justify-between ">Experience <div className="flex gap-2"><ActionIcon onClick={()=> setAddExp(true)} variant="subtle" color="brightSun.4" size='lg' ><IconPlus className="h-4/5 w-4/5"  />     
                </ActionIcon> <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(3)} size='lg' >
    {edit[3]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div></div>
            <div className="flex flex-col gap-8">
                {
                  profile?.experiences?.map((exp:any,index:number)=> <ExpCard key={index} {...exp} edit={edit[3]} />)
                }
                {addExp && <ExpInput add setEdit={setAddExp} />}
            </div>
            
          </div>
          <Divider mx='xs' my='xl' />
          <div className="">
            <div className="text-2xl font-semibold mb-4 flex justify-between">Certification   <div className="flex gap-2"><ActionIcon onClick={()=> setAddCerti(true)} variant="subtle" color="brightSun.4" size='lg' ><IconPlus className="h-4/5 w-4/5"  />     
                </ActionIcon> <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(4)} size='lg' >
    {edit[4]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div> </div>
                <div className="flex flex-col gap-8">
                    {
                      profile?.certifications?.map((certi:any , index:number) =><CertiCard key={index} edit={edit[4]} {...certi} />)
                    }
                    {
                     addCerti&& <CertiInput setEdit={setAddCerti} />
                    }
                </div>
          </div>
</div>
</div>

  
}
export default Profile;