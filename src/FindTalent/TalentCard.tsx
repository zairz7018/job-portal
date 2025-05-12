// import { Divider, Text } from "@mantine/core";
// import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";

import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { ErrorNotification, SuccessNotification } from "../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard=(props:any)=>{
  const [opened,{open , close}] = useDisclosure(false);
  const [app , {open: openApp , close : closeApp}] = useDisclosure();
  const [date,setDate] = useState<Date | null>(null);
  const [time , setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [profile , setProfile] = useState<any>({});
  const {id} = useParams();
  useEffect(() =>{
    if(props.applicantId)getProfile(props.applicantId).then((res) =>{
      setProfile(res);
    }).catch((err) =>{
      console.log(err);
    })
    else setProfile(props);
  } , [props])
  const handleOffer = (status:string) =>{
    let interview:any = {id , applicantId:profile?.id , 
      applicationStatus : status };
      if(status == "INTERVIEWING"){
        const [hours , minutes] = time.split(":").map(Number);
         date?.setHours(hours , minutes) ;
         interview = {...interview , interviewTime:date};
      }
    
    
    changeAppStatus(interview).then((res)=>{
      if (status === "INTERVIEWING") {
        SuccessNotification("Interview Scheduled", "Interview Scheduled Successfully");
      } else if (status === "OFFERED") {
        SuccessNotification("Offer Accepted", "Offer Accepted Successfully");
      } else {
        SuccessNotification("Rejected", "Applicant has been Rejected");
      }
      
      window.location.reload();
    }).catch((err) =>{
      console.log(err);
      ErrorNotification("Error" , err.response.data.errorMessage);
    })
  }
    return <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <div className="p-2 bg-mine-shaft-800 rounded-md ">
            <Avatar size="lg" src={profile?.picture?
              `data:image/jpeg;base64,${profile?.picture}`:
              "/avatar.png" } alt="" />
          </div>
          <div>
            <div className="font-semibold text-lg">erreur de name{profile?.name}</div>
            <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &bull; {profile?.company} </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2">
        {
          profile?.skills?.map((skill:any , index:any) => index<4 &&  <div key={index} className="  py-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs"> {skill}</div>)
        }
        
      </div>
      <div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3} > {profile?.about}
        </Text>
      </div>
      
      <Divider size="xs" color="mineShaft.7" />
      {
        props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview : {formatInterviewTime(props.interviewTime)}
        </div> :
        <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
        200 Euro
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconMapPin className="h-5  w-5" stroke={1.5} />{profile?.location}
        </div>
      </div>
      }
      
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
      {
        !props.invited &&<>
        <Link to={`/talent-profile/${profile.id}`}>
          <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
        </Link>
        <div>
          {props.posted?<Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} color="brightSun.4" variant="light" fullWidth>Schedule</Button>
          :<Button color="brightSun.4" variant="light" fullWidth>Message</Button>}
        </div>
        </>
      }
        
      {
        props.invited && <>
        <div>
          <Button color="brightSun.4" variant="outline" fullWidth onClick={()=>handleOffer("OFFERED")}
          >Accept</Button>
        </div>
        <div>
        <Button color="brightSun.4" variant="light" fullWidth onClick={()=>handleOffer("REJECTED")}
        >Reject</Button>
        </div>
        
        </>
      }
        
      </div>
      { (props.invited || props.posted) &&
        <Button color="brightSun.4" variant="filled" onClick={openApp} fullWidth autoContrast>View Application</Button>
        }
      <Modal opened={opened} onClose={close} title="schedule Interview" centered >
        <div className="flex flex-col gap-4">
          <DateInput value={date} minDate={new Date()} onChange={setDate} label="date" placeholder="Entrer Date" />
          <TimeInput label="Time" ref={ref} value={time} onChange={(event)=>setTime(event.currentTarget.value)}
           onClick={()=>ref.current?.showPicker()} />
          <Button onClick={() => handleOffer("INTERVIEWING")}
           color="brightSun.4" variant="light" fullWidth>Schedule</Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application" centered >
        <div className="flex flex-col gap-4">
        <div>
          Email : &emsp; <a href={`mailto:${props.email}`} className="text-bright-sun-400 hover:underline cursor-pointer text-center" 
          > {props.email}</a>
         </div>

         <div>
          Website : &emsp; <a target="_blank" className="text-bright-sun-400 hover:underline cursor-pointer text-center" 
          href={props.website}> {props.website}</a>
         </div>

         <div>
          Resume : &emsp; <span className="text-bright-sun-400 hover:underline cursor-pointer text-center" 
           onClick={() =>openBase64PDF(props.resume)} > {props.name}</span>
         </div>

         <div>
          CoverLetter : &emsp; <div > {props.coverLetter}</div>
         </div>
        </div>
      </Modal>
    </div>
}
export default TalentCard;