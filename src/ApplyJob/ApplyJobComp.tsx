import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyJobComp = () => {
  const  [Preview , setPreview] = useState(false);
  const [Submit , setSubmit] = useState(false);
  const [sec , setSec] = useState(5);
  const navigate = useNavigate();
  const handlePreview = () => {
    setPreview(!Preview);
    window.scrollTo({top:0 , behavior: 'smooth'});
    
  }
  const handleSubmit = () => {
    setSubmit(true);
    let x = 5;
    setInterval(() => {
      x--;
      setSec(x);
      if(x == 0)navigate("/find-jobs")
      
    },1000)
    
  }

  return <> <div className="w-2/3 mx-auto">
    <LoadingOverlay className="!fixed "
     visible={Submit} zIndex={1000} overlayProps={{ radius:'sm' , blur : 2 }} loaderProps={{color:'brightSun.4' , type:'bars'}} />
    <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <div className="p-3 bg-mine-shaft-800 rounded-xl ">
            <img className="h-14" src={`/Icons/Google.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold text-2xl">Software Engineer III</div>
            <div className="text-lg text-mine-shaft-300">Google &bull; 3 days ago &bull; 48 Applications</div>
          </div>
        </div>
        
          
      </div>
      <Divider my="xl" />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2 ">
          <TextInput readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} label="Full name" placeholder = "Enter name" withAsterisk  />
          <TextInput label="Email" placeholder = "Enter email" withAsterisk />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 ">
          <NumberInput readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`}  label="Phone number" placeholder = "Enter phone number" withAsterisk hideControls min={0} max={9999999999} clampBehavior="strict" />
          <TextInput readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Personal Website" placeholder = "Enter Url"  />
        </div>
        <FileInput readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Atach your CV"  placeholder="Your Cv " leftSectionPointerEvents="none"/>
        <Textarea readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk placeholder="Type something about your self..." label="Cover letter"  minRows={4} autosize />
        
          {!Preview &&<Button onClick={handlePreview} color="brightSun.4" variant="light" >Preview</Button>}
          {
            Preview && <div className="flex gap-10 [&>*]:w-1/2">
                <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline" >Edit</Button>
                <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light" >Submit</Button>
            </div>
          }
      </div>
  </div>
  <Notification className={`!border-bright-sun-400 -translate-y-20 !fixed top-0 left-[35%] transition duration-300 ease-in-out z-[1001]
    ${Submit?"translate-y-0" : ""}
    `} icon={<IconCheck style={{width : rem(20) , height: rem(20)}}/>} color="teal" withBorder title="Application Submitted!" mt="md" withCloseButton={false} > 
          Redirecting to jobs in {sec} seconds...
  </Notification>
    </>
}
export default ApplyJobComp;