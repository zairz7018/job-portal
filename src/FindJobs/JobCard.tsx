// import { Divider, Text } from "@mantine/core";
// import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";

import { Divider, Text } from "@mantine/core";
import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const jobCard=(props:any)=>{
    return <Link to={`/Jobs/${props.id}`} className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <div className="p-2 bg-mine-shaft-800 rounded-md ">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants?props.applicants.lenght:0} Applications</div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2">
        <div className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{props.experience}</div>
        <div className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{props.jobType}</div>
        <div className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{props.location}</div>
      </div>
        
      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3} > {props.about}
      </Text>
      <Divider size="xs" color="gray.6" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &euro; {props.packageOffered} Euro
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-5  w-5" stroke={1.5} /> Posted {timeAgo(props.postTime)} Days ago
        </div>
      </div>
    </Link>
}
export default jobCard;