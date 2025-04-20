import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconAdjustments, IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { profile } from "../Data/TalentData";
import { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";


const Profile = () =>{
  const select = fields;
  const skills = ["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS", "Tailwind CSS", "Python", "Django"];
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const handleEdit=(index:any)=>{
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  }
  return <div className="w-4/5 mx-auto">
    <div className=""></div>
      <div className="relative">
          <img className="rounded-t-2xl" src="/profile/banner.jpg" alt="" />
          <img className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/avatar.png" alt="" />
          </div>
      
          <div className="px-3 mt-16">
              <div className="text-3xl font-semibold flex justify-between"> Zakarya zair
                <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(0)} size='lg' >
    {edit[0]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon>
              </div>
              {
                edit[0]?<><div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput {...select[0]}/>
                <SelectInput {...select[1]}/>
                      </div>
                <SelectInput {...select[2]}/></>:<><div className="text-xl flex gap-1 items-center"> <IconBriefcase className="h-5 w-5" stroke={1.5}  />role &bull; Company</div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                <IconMapPin className="h-5 w-5" stroke={1.5} />Location
              </div></>
              }
              
              <Divider mx='xs' my='xl' />


              <div>
                  <div className="text-2xl font-semibold mb-3 flex justify-between">About <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(1)} size='lg' >
    {edit[1]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div>
                  <div className="text-sm text-mine-shaft-300 text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi labore dolorem at impedit architecto exercitationem id, consequatur dolorum possimus cupiditate.
                  </div>
          </div>
          <Divider mx='xs' my='xl' />
          <div >
            <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(2)} size='lg' >
    {edit[2]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div>
            <div className=" flex flex-wrap gap-2">
              {
                skills.map((skill:any , index:any) =><div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-xl text-bright-sun-800 px-3 py-1 ">{skill} </div> )
              }
              
              
            </div>
            
          </div>
          <Divider mx='xs' my='xl' />
          <div className="px-3 ">
            <div className="text-2xl font-semibold mb-4 flex justify-between ">Experience <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(3)} size='lg' >
    {edit[3]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon></div>
            <div className="flex flex-col gap-8">
                {
                  profile.experience.map((exp,index)=> <ExpCard key={index} {...exp} />)
                }
            </div>
            
          </div>
          <Divider mx='xs' my='xl' />
          <div className="">
            <div className="text-2xl font-semibold mb-4 flex justify-between">Certification <ActionIcon variant="subtle" color="brightSun.4" onClick={()=>handleEdit(4)} size='lg' >
    {edit[4]?<IconDeviceFloppy className="h-4 w-4"/>:<IconPencil className="h-4/5 w-4/5"  />}              
                </ActionIcon> </div>
                <div className="flex flex-col gap-8">
                    {
                      profile.certifications.map((certi:any , index:any) =><CertiCard key={index} {...certi} />)
                    }
                </div>
          </div>
</div>
</div>

  
}
export default Profile;