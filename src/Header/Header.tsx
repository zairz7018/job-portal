import { Avatar } from '@mantine/core';

import { IconAsset, IconBell, IconSettings } from "@tabler/icons-react";

const Header = () => {
  return <div className="w-full bg-black px-6 text-white flex justify-between h-28 items-center">
      <div className="flex gap-3 items-center">

      <IconAsset stroke={1.25} className="h-10 w-10"/>
      <div className="text-3xl font-semibold">Ijobs</div>
        
      </div>

      <div className="flex gap-3">
        <a href="##">Find Jobs</a>
        <a href="##">Find Talent</a>
        <a href="##">Upload Job</a>
        <a href="##">About us</a>
      </div>
      
      <div className="flex gap-5 items-center">
      
      <IconBell />
        <div className="flex items-center gap-2">
          <div>ZAKARYA</div>
          <Avatar src="avatar.png" alt="it's me" />
        </div>
      <IconSettings />
      </div>
      
      
    </div>
  
}
export default Header;