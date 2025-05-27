import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";
import { changeProfile } from "../Slices/ProfileSlice";
import { SuccessNotification } from "../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const CertiCard = (props:any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state:any) => state.profile);
  const matches = useMediaQuery("(max-width: 475px)");
  const handleDelete =() =>{
    let certi = [...profile.certifications];
    certi.splice(props.index , 1);
    let updateProfile = {...profile, certifications:certi}; 
    dispatch(changeProfile(updateProfile));
    SuccessNotification("Success" , "Certificate Deleted Successfully ")
  }
  return <div className="flex justify-between sm-mx:flex-wrap">
    <div className="flex gap-2 items-center ">
      <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
        <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
      </div>
      <div className="flex flex-col ">
        <div className="font-semibold xs-mx:text-sm">{props.name} </div>
        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">{props.issuer}</div>
      </div>
      </div>

      <div className="flex  gap-2">
          <div className=" flex justify-between items-center gap-2 xs-mx:flex-wrap sm-mx:flex-nowrap sm-mx:items-start">
              <div className="flex flex-col items-end justify-center text-end sm-mx:items-start sm-mx:text-left sm-mx:flex-row sm-mx:gap-3">Issued {formatDate(props.issueDate)}</div>
              <div className="flex flex-col items-end justify-center text-end sm-mx:items-start sm-mx:text-left sm-mx:flex-row sm-mx:gap-3">id : {props.certificateId}</div>
          </div>

          {props.edit && <ActionIcon onClick={handleDelete} size={matches ? "md" : "lg"} variant="subtle" color="red.8"  >
              <IconTrash className="h-4/5 w-4/5" stroke={1.5} />             
            </ActionIcon>}
      </div>
    
    </div>
    
}
export default CertiCard; 