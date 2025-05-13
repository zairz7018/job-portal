import { useState } from "react";
import fields from "../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { SuccessNotification } from "../Services/NotificationService";

const Info=()=>{
  const profile = useSelector((state:any)=>state.profile)
  const dispatch= useDispatch();
  const user=useSelector((state:any)=>state.user);
  const select = fields;
  const [edit , setEdit]= useState(false);

  const handleEdit=()=>{
    if(!edit){
      setEdit(true);
      form.setValues({jobTitle: profile.jobTitle , company:profile.company , location:profile.location , 'totalExp':profile.totalExp} );
    }else setEdit(false); 
    
  }
  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '' , location: '', totalExp: 1 } 
  });
  const handleSave=()=>{
    setEdit(false); 
      let updateProfile = {...profile, ...form.getValues()};
      dispatch(changeProfile(updateProfile));
      SuccessNotification("Success" , "Profile updated Successfuly !")
  }
  return <>
  <div className="text-3xl font-semibold flex justify-between">{user.name}
     <div>
     {edit&& <ActionIcon variant="subtle" color="green.8" onClick={handleSave} size='lg' >
     <IconCheck className="h-4/5 w-4/5" stroke={1.5}/> </ActionIcon>}
     <ActionIcon variant="subtle" color={edit?"red.8":"brightSun.4"} onClick={handleEdit} size='lg' >
          {edit ?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" stroke={1.5}  />}              
     </ActionIcon> 
      </div> 
      </div>
                    
              {
                edit?<><div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="jobTitle" {...select[0]}/>
                <SelectInput form={form} name="company"  {...select[1]}/>
                      </div>
                      <div className="flex gap-10 [&>*]:w-1/2">
                      <SelectInput form={form} name="location"  {...select[2]}/>
                      <NumberInput label = "Experience : " withAsterisk hideControls clampBehavior="strict" min={1} max={50}
                       {...form.getInputProps('totalExp')} />
                      </div>
                </>:<>
                <div className="text-xl flex gap-1 items-center"> <IconBriefcase className="h-5 w-5" stroke={1.5}  />{profile.jobTitle} &bull; {profile.company}</div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                <IconMapPin className="h-5 w-5" stroke={1.5} />{profile?.location}
              </div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                <IconBriefcase className="h-5 w-5" stroke={1.5} />Experience : {profile.totalExp} Years
              </div>
              </>
              }</>
}
export default Info;