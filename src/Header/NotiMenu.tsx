import { Menu,  Switch, rem, Indicator, Notification, Stack } from '@mantine/core';
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
  IconBell,
  IconCheck,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotifications, readNotification } from '../Services/NotiService';
import { on } from 'events';
import { updateLanguageServiceSourceFile } from 'typescript';


const NotiMenu = () =>{ 
  const user=useSelector((state:any)=>state.user);
  const [notifications , setNotification] = useState<any>([]);
  const unread = (index:number)=>{
    let notis = [...notifications];
    notis = notis.filter((noti:any , i:number)=> i!== index)
    setNotification(notis);
    readNotification(notifications[index].id).then((res:any)=> console.log(res)).catch((error:any)=> console.log(error));
  }
  useEffect(()=>{
    getNotifications(user.id).then((res:any)=> {
      console.log(res);
      setNotification(res);
    }).catch((error:any)=> console.log(error));
  },[user])
    const [opened, setOpened] = useState(false);
  
  return <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>

        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
        <Indicator color="brightSun.4" size={9} processing offset={6}>
          <IconBell stroke={1.5} />
        </Indicator>
        </div>

      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
            <div className='flex flex-col gap-1'>
  {
    notifications.map((noti: any, index: number) => (
      <Notification
        key={index}
        className="hover:bg-mine-shaft-900 cursor-pointer"
        onClose={() => unread(index)}
        title={noti.action}
        mt="md"
        color='teal'
        icon={
          <IconCheck
          
            style={{ width: rem(20), height: rem(20) }}
          />
        }
      >
        {noti.message}
      </Notification>
    ))
  }
  {
    notifications.length === 0 && <div className='text-center text-gray-500'>No Notifications</div>
  }
</div>
              
      </Menu.Dropdown>
    </Menu>
}
export default NotiMenu;