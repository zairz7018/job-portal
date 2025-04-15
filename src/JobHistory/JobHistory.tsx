import {  Tabs } from "@mantine/core"
import { jobList } from "../Data/JobsData"
import Card from "./Card"

const JobHistory = () => {
  return <div className="">
    <div className="text-2xl font-semibold mb-5">Job History</div>
    <div>
                <Tabs variant="outline" radius="lg" defaultValue="Applied">
                  <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="Applied" > Applied  </Tabs.Tab>
                    <Tabs.Tab value="Saved" > Saved </Tabs.Tab>
                    <Tabs.Tab value="Offered" > Offered </Tabs.Tab> 
                    <Tabs.Tab value="interviewing" > interviewing </Tabs.Tab> 
                  </Tabs.List>
                  
                
                <Tabs.Panel value="Applied" > 
                    <div className="mt-10 flex flex-wrap gap-5">
                      {
                        jobList.map((job,index) => <Card key={index} {...job} Applied />)
                      }
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="Saved" > 
                    <div className="mt-10 flex flex-wrap gap-5">
                      {
                        jobList.map((job,index) => <Card key={index} {...job}  Saved/>)
                      }
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="Offered" >
                      <div className="mt-10 flex flex-wrap gap-5">
                        {
                          jobList.map((job,index) => <Card key={index} {...job} Offered />)
                        }
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="interviewing" >
                    <div className="mt-10 flex flex-wrap gap-5">
                      {
                        jobList.map((job,index) => <Card key={index} {...job} interviewing/>)
                      }
                    </div>
                </Tabs.Panel>
                </Tabs>
              </div>
</div>
}
export default JobHistory