import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
// import { profile } from "console";

const TalentProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Divider size="xs"  />
        <Link to="/find-talent" className="my-4 inline-block">
                  <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light" >Back</Button>
                </Link>
        <div className="flex gap-5">
            <Profile  {...profile}/>
        </div>
    </div>
  )
}
export default TalentProfilePage ;