import { Badge, Tabs } from "@mantine/core";
import Job from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const PostedJobDesc = (props:any) => {
  return <div className="mt-5 w-3/4 px-5">
      {props.jobTitle?<> 
        <div className="text-2xl font-semibold flex items-center">{props.jobTitle} <Badge variant="light" ml='sm' size="sm" color="brightSun.4" >{props.jobStatus}</Badge></div>
    <div className="font-medium text-mine-shaft-300 mb-3">
      {props.location } 
    </div>
    <div>
    <Tabs variant="outline" radius="lg" defaultValue="Overview">
                  <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="Overview" > Overview </Tabs.Tab>
                    <Tabs.Tab value="Applicants" > Applicants </Tabs.Tab>
                    <Tabs.Tab value="Invited" > Invited </Tabs.Tab> 
                    <Tabs.Tab value="offered" > Offered </Tabs.Tab>
                    <Tabs.Tab value="rejected" > Rejected </Tabs.Tab>
                  </Tabs.List>
                  
                
                <Tabs.Panel value="Overview" className="[&>div]:w-full" > <Job {...props} edit /> </Tabs.Panel>
                <Tabs.Panel value="Applicants" > 
                  <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {
                      props.applicants?.filter((x:any) => x.applicationStatus =='APPLIED').map((talent:any,index:any)=> <TalentCard key={index} {...talent} posted />)
                  }
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="Invited" > 
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {
                      props.applicants?.filter((x:any) => x.applicationStatus =='INTERVIEWING').map((talent:any,index:any)=> <TalentCard key={index} {...talent} invited />)
                  }
                  </div> </Tabs.Panel>

                  <Tabs.Panel value="offered" > 
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {
                      props.applicants?.filter((x:any) => x.applicationStatus ==='OFFERED').map((talent:any,index:any)=> <TalentCard key={index} {...talent} offered />)
                  }
                  </div> </Tabs.Panel>

                  <Tabs.Panel value="rejected" > 
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {
                      props.applicants?.filter((x:any) => x.applicationStatus ==='REJECTED').map((talent:any,index:any)=> <TalentCard key={index} {...talent} rejected />)
                  }
                  </div> </Tabs.Panel>
                </Tabs>
    </div>
    </>: <div className="text-2xl font-semibold min-h-[70vh] flex justify-center items-center"> No Job Selected</div>
    }
  </div>
}
export default PostedJobDesc;