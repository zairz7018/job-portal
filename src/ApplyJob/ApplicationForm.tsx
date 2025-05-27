import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorNotification, SuccessNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm =() =>{
  const navigate = useNavigate();
  const {id} = useParams();
  const user = useSelector((state:any)=>state.user);
  const  [Preview , setPreview] = useState(false);
  const [Submit , setSubmit] = useState(false);
  const handlePreview = () => {
    window.scrollTo({top:0 , behavior: 'smooth'});
    form.validate();
    if(!form.isValid())return;
     
    setPreview(!Preview); 
    
    
  }
  const handleSubmit =async () => {
      setSubmit(true);
      let resume:any = await getBase64(form.getValues().resume);
      let applicant = {...form.getValues() ,applicantId:user.id ,resume:resume.split(',')[1]};
      applyJob(id , applicant) .then((res) =>{
        setSubmit(false);
        SuccessNotification("Success" , "Application Submited Sucssfully");
        navigate("/job-history")
      }).catch((err) =>{
        setSubmit(false);
        ErrorNotification("Error" , err.response.data.errorMessage);
      })
  }
  const form = useForm({
      mode: 'controlled',
      validateInputOnChange: true,
      initialValues: {
        name: "",
        email: "",
        phone: "",
        website:"",
        resume: null,
        coverLetter:''
      },
      validate: {
        name: isNotEmpty('name cannot be empty'),
        email:isNotEmpty('email connot be empty'),
        phone:isNotEmpty('phone connot be empty'),
        website:isNotEmpty('website connot be empty'),
        resume:isNotEmpty('resume connot be empty')

      }
    }); 
  return <div>
    <LoadingOverlay className="!fixed "
     visible={Submit} zIndex={1000} overlayProps={{ radius:'sm' , blur : 2 }} loaderProps={{color:'brightSun.4' , type:'bars'}} />

    <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-10 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap md-mx:gap-5">
          <TextInput {...form.getInputProps("name")}
           readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} label="Full name" placeholder = "Enter name" withAsterisk  />
          <TextInput {...form.getInputProps("email")} 
          label="Email" placeholder = "Enter email" withAsterisk />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap md-mx:gap-5 ">
          <NumberInput {...form.getInputProps("phone")}
           readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`}  label="Phone number" placeholder = "Enter phone number" withAsterisk hideControls min={0} max={9999999999} clampBehavior="strict" />
          <TextInput {...form.getInputProps("website")}
          readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Personal Website" placeholder = "Enter Url"  />
        </div>
        <FileInput  {...form.getInputProps("resume")} accept="application/pdf"
        readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Atach your CV"  placeholder="Your Cv " leftSectionPointerEvents="none"/>
        <Textarea {...form.getInputProps("coverLetter")}
        readOnly={Preview} variant={Preview?"unstyled" : "default"} className={`${Preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk placeholder="Type something about your self..." label="Cover letter"  minRows={4} autosize />
        
          {!Preview &&<Button onClick={handlePreview} color="brightSun.4" variant="light" >Preview</Button>}
          {
            Preview && <div className="flex gap-10 [&>*]:w-1/2">
                <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline" >Edit</Button>
                <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light" >Submit</Button>
            </div>
          }
      </div>
  </div>
}
export default ApplicationForm;