import { Avatar, AvatarGroup, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";

const Company = () => {
  // const
  return <div className="w-3/4"> 
    <div className="relative">
          <img className="rounded-t-2xl" src="/profile/banner.jpg" alt="" />
          <img className="w-36 h-36 rounded-3xl bg-mine-shaft-950 -bottom-1/4 absolute left-5 border-mine-shaft-950 border-8 p-2" src="/Icons/Google.png" alt="" />
          </div>
      
          <div className="px-3 mt-12">
              <div className="text-3xl font-semibold flex justify-between">Google
                <Avatar.Group> 
                  <Avatar src="/avatar.png" />
                  <Avatar src="/avatar1.png" />
                  <Avatar src="/avatar2.png" />
                  <Avatar>10k+</Avatar>
                </Avatar.Group>
              </div>

              <div className="text-lg flex gap-1 items-center text-mine-shaft-400">
                  <IconMapPin className="h-5 w-5" stroke={1.5} /> casa

              </div>
              <Divider  my="xl" />
              <div>
                <Tabs variant="outline" radius="lg" defaultValue="About">
                  <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="About" > About Tab </Tabs.Tab>
                    <Tabs.Tab value="Jobs" > Jobs </Tabs.Tab>
                    <Tabs.Tab value="Employees" > Employees </Tabs.Tab> 
                  </Tabs.List>
                  
                
                <Tabs.Panel value="About" > <AboutComp /> </Tabs.Panel>
                <Tabs.Panel value="Jobs" > About Tab </Tabs.Panel>
                <Tabs.Panel value="Employees" > Employees </Tabs.Panel>
                </Tabs>
              </div>
      </div>
      
       
  </div>
  
}
export default Company;