import { useState } from "react";
import fields from "../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { SuccessNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info=()=>{
  const profile = useSelector((state:any)=>state.profile)
  const matches = useMediaQuery("(max-width: 475px)");
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
  <div className="text-3xl font-semibold flex justify-between xs-mx:text-2xl xsm-mx:text-xl">{user.name}
     <div>
     {edit&& <ActionIcon variant="subtle" color="green.8" onClick={handleSave} size={matches ? "md" : "lg"} >
     <IconCheck className="h-4/5 w-4/5" stroke={1.5}/> </ActionIcon>}
     <ActionIcon variant="subtle" color={edit?"red.8":"brightSun.4"} onClick={handleEdit} size={matches ? "md" : "lg"} >
          {edit ?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" stroke={1.5}  />}              
     </ActionIcon> 
      </div> 
      </div>
                    
              {
                edit?<><div className="flex gap-10 flex-wrap xs-mx:flex-col xs-mx:gap-4">
        <SelectInput form={form} name="jobTitle" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>

      <div className="flex gap-10 flex-wrap xs-mx:flex-col xs-mx:gap-4 mt-4">
        <SelectInput form={form} name="location" {...select[2]} />
        <NumberInput
          label="Experience : "
          withAsterisk
          hideControls
          clampBehavior="strict"
          min={1}
          max={50}
          {...form.getInputProps('totalExp')}
        />
      </div>
                </>:<>
                <div className="text-xl flex gap-1 items-center xs-mx:text-base"> <IconBriefcase className="h-5 w-5" stroke={1.5}  />{profile.jobTitle} &bull; {profile.company}</div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300 xs-mx:text-base">
                <IconMapPin className="h-5 w-5" stroke={1.5} />{profile?.location}
              </div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300 xs-mx:text-base">
                <IconBriefcase className="h-5 w-5" stroke={1.5} />Experience : {profile.totalExp} Years
              </div>
              </>
              }</>
}
export default Info;