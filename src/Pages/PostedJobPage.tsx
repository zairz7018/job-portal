import { Button, Divider, Drawer } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";


const PostedJobPage = () => {
  const {id} = useParams();
  const matches = useMediaQuery("(max-width: 767px)");
  const [opened , {open , close }] = useDisclosure(false);
  const user = useSelector((state:any) => state.user);
  const [jobList , setJobList] = useState<any[]>([]);
  const [job , setJob] = useState<any>({});
  const navigate = useNavigate()

  useEffect(()=>{
    
    window.scrollTo(0,0);
    
    getJobPostedBy(user.id).then((res)=>{
      setJobList(res);
      if(res && res.length > 0 && Number(id) == 0) navigate(`/posted-jobs/${res[0].id}`)
      setJob(res.find((item:any) => item.id == id))
    }).catch((err) =>{
      console.log(err);
    })
  }, [id])

  return <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-5 md-mx:p-0">
    <Divider size="xs"  />    
    {matches && <Button onClick={open} my='xs' size="sm" autoContrast > All Jobs </Button>}    
    <Drawer opened={opened} onClose={close } title="All Jobs" size={230} overlayProps={{backgroundOpacity: 0.5 , blur:4}} >
      <PostedJob job={job} jobList = {jobList}/>
    </Drawer>
  <div className="flex gap-5 justify-between">
    {!matches && <PostedJob job={job} jobList = {jobList}/>}
    <PostedJobDesc {...job}/>
  </div>
</div>
}
export default PostedJobPage;