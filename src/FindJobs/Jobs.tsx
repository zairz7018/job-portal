import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import Experience from "../Profile/Experience";
import { stat } from "fs";
import { resetSort } from "../Slices/SortSlice";

const Jobs=()=>{
  const dispatch = useDispatch();
  const [jobList , setJobList] = useState([{}]);
  const filter = useSelector((state : any) => state.filter);
  const sort = useSelector((state : any) => state.sort);
  const [filtredJobs, setFiltredJobs] = useState<any>([]);
  useEffect(() =>{

    getAllJobs().then((res) =>{
      dispatch(resetFilter());
      dispatch(resetSort());
      setJobList(res.filter((job:any)=> job.jobStatus === "ACTIVE"));
      console.log(res[0]);

    }).catch((err) =>{
      console.log(err);
    })
  },[])
  useEffect(()=>{
    if(sort ==="Most Recent"){
      setJobList([...jobList].sort((a:any,b:any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
    }else if(sort === "Salary :Low to high"){
      setJobList([...jobList].sort((a:any,b:any) => a.packageOffered - b.packageOffered));
    }else if(sort === "Salary :high to low"){
      setJobList([...jobList].sort((a:any,b:any) => b.packageOffered - a.packageOffered));
    }
  },[sort])

  useEffect(() => {
    let filtered = jobList;
  
   
  
    // Filtrage par Job Title
    if (Array.isArray(filter["Job Title"]) && filter["Job Title"].length > 0) {
      filtered = filtered.filter((job: any) =>
        filter["Job Title"].some((title: string) =>
          job.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
  
    // Filtrage par Location (version corrigée)
const locations = Array.isArray(filter.location) 
? filter.location 
: filter.location 
? [filter.location] 
: [];

if (locations.length > 0) {
filtered = filtered.filter((jobs: any) => {
  // Normalisation des données
  const jobLocations = Array.isArray(jobs.location) 
    ? jobs.location.map((l: string) => l?.toLowerCase().trim())
    : [jobs.location?.toLowerCase().trim()];

  return locations.some((loc: string) => 
    jobLocations.includes(loc.toLowerCase().trim())
  );
});
}
    
    const Experience = Array.isArray(filter["Experience"]) // <-- "Skills" avec S majuscule
    ? filter["Experience"]
    : filter["Experience"]
    ? [filter["Experience"]]
    : [];

  if (Experience.length > 0) {
    filtered = filtered.filter((job: any) =>
      Experience.some((skill: string) =>
        job.skills?.job.experience?.toLowerCase().includes(skill.toLowerCase())
        )
      );
  }

  
  // Filtrage par Job Type
  if (Array.isArray(filter["Job Type"]) && filter["Job Type"].length > 0) {
    filtered = filtered.filter((job: any) =>
      filter["Job Type"].some((title: string) =>
        job.jobType?.toLowerCase().includes(title.toLowerCase())
      )
    );
  }
    // ...

    if(filter.salary && filter.salary.length > 0){
      filtered = filtered.filter((jobs: any) =>filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <=
      filter.salary[1]);
      setFiltredJobs(filtered);
    }

  
  
    console.log("Filtre appliqué :", filter);
    setFiltredJobs(filtered);
  }, [filter, jobList]);
  




  return <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
            <Sort sort="job" />
      </div>
      <div className="mt-10 flex flex-wrap gap-5">
        {
          filtredJobs.map((job:any,index:any) => <JobCard key={index} {...job} />)
        }
      </div>
      
  </div>
}
export default Jobs;