import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import Company from "../CompanyProfile/Company";
import { postJob } from "../Services/JobService";
import { ErrorNotification, SuccessNotification } from "../Services/NotificationService";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PostJob = () => {
  const user = useSelector((state:any) => state.user);
  const navigate = useNavigate();
  const select = fields;
  const form = useForm({
    mode:'controlled',
    validateInputOnChange:true,
    initialValues:{
      jobTitle:'',
      company:'',
      experience:'',
      jobType:'',
      location:'',
      packageOffered:'',
      skillsRequired:[],
      about:'',
      description:content
    },
    validate:{
      jobTitle: isNotEmpty('Title is Required'),
      company: isNotEmpty('Company is Required'),
      experience: isNotEmpty('experience is Required'),
      jobType: isNotEmpty('job Type is Required'),
      location: isNotEmpty('Location is Required'),
      packageOffered: isNotEmpty('packageOffered is Required'),
      skillsRequired: isNotEmpty('skillsRequired is Required'),
      about: isNotEmpty('about is Required'),
      description: isNotEmpty('description is Required')
    }
  });
  const handlePost = () =>{
    form.validate();
    if(!form.isValid())return;
    postJob({...form.getValues() ,postedBy:user.id , jobStatus:"ACTIVE" }).then((res) =>{
      SuccessNotification("Success" , "Job Posted Successfuly");
      navigate(`/posted-job/${res.id}`);
    }).catch((err) =>{
      console.log(err);
      ErrorNotification("Error", err.response.data.errorMessage);
    })
  }

  const handleDraft = () =>{
    postJob({...form.getValues() ,postedBy:user.id , jobStatus:"DRAFT" }).then((res) =>{
      SuccessNotification("Success" , "Job Drafted Successfuly");
      navigate(`/posted-jobs/${res.id}`);
    }).catch((err) =>{
      console.log(err);
      ErrorNotification("Error", err.response.data.errorMessage);
    })
  }
  return <div className="w-4/5 mx-auto">
    <div className="text-2xl font-semibold mb-5">Post a job </div>
    <div className="flex flex-col gap-5">
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="jobTitle" {...select[0]}/>
        <SelectInput form={form} name="company"{...select[1]}/>
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="experience"{...select[2]}/>
        <SelectInput form={form} name="jobType" {...select[3]}/>
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="location" {...select[4]}/>
        <NumberInput label="Salary" placeholder="Enter Salary" hideControls
        min={1} max={300} clampBehavior="strict" withAsterisk
        {...form.getInputProps('packageOffered')}
        />
      </div>
      <TagsInput {...form.getInputProps('skillsRequired')}
      withAsterisk label="Skills" placeholder="Enter skill" splitChars={[',',' ' , '|']} clearable acceptValueOnBlur  />
      <Textarea
                        {...form.getInputProps("about")}
                        className="my-3"
                        withAsterisk
                        label="About Job"
                        placeholder="Enter About Job ..."
                        autosize
                        minRows={2}
      />
      
      <div className="[&_button[data-active='true']]:!text-bright-sun-300  [&_button[data-active='true']]:!bg-bright-sun-400/20">
        <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
        <TextEditor form={form} />
      </div>
      <div className="flex gap-4">
      <Button color="brightSun.4" onClick={handlePost} variant="light" >Public job</Button>
      <Button color="brightSun.4" variant="outline" onClick={handleDraft} >Save As Draft</Button>
      </div>
    </div>
  </div>
}
export default PostJob;