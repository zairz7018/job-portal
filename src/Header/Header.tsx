import { Avatar, Indicator } from '@mantine/core';

import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from './NavLinks';

const Header = () => {
  return <div className="w-full bg-mine-shaft-950 px-6 text-white flex justify-between h-28 items-center font-['poppins']">
      <div className="flex gap-1 items-center text-bright-sun-400" >

      <IconAnchor stroke={2.5} className="h-8 w-8"/>
      <div className="text-3xl font-semibold">JobHook</div>
        
      </div>

      {NavLinks()} 
      
      <div className="flex gap-5 items-center">
      
      
        <div className="flex items-center gap-2">
          <div>ZAKARYA</div>
          
          <Avatar src="avatar.png"   style={{ width: "35px", height: "35px" }} />
          
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
        <IconSettings />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
        <Indicator color="brightSun.4" size={9} processing offset={6}>
          <IconBell stroke={1.5} />
        </Indicator>
        </div>
        
      
      </div>
      
      
    </div>
  
}
export default Header;