import { Badge, Tabs } from "@mantine/core";
import Job from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const PostedJobDesc = () => {
  return <div className="mt-5 w-3/4 px-5">
    <div className="text-2xl font-semibold flex items-center"> Software Enginner <Badge variant="light" ml='sm' size="sm" color="brightSun.4" >Badge</Badge></div>
    <div className="font-medium text-mine-shaft-300 mb-3">
      New York , usa 
    </div>
    <div>
    <Tabs variant="outline" radius="lg" defaultValue="Overview">
                  <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="Overview" > Overview </Tabs.Tab>
                    <Tabs.Tab value="Applicants" > Applicants </Tabs.Tab>
                    <Tabs.Tab value="Invited" > Invited </Tabs.Tab> 
                  </Tabs.List>
                  
                
                <Tabs.Panel value="Overview" className="[&>div]:w-full" > <Job edit /> </Tabs.Panel>
                <Tabs.Panel value="Applicants" > 
                  <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {
                      talents.map((talent,index)=> index <6 && <TalentCard key={index} {...talent} posted />)
                  }
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="Invited" > 
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {
                      talents.map((talent,index)=> index <6 && <TalentCard key={index} {...talent} invited />)
                  }
                  </div> </Tabs.Panel>
                </Tabs>
    </div>
  </div>
}
export default PostedJobDesc;