import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin.tsx/SignUp";
import Login from "../SignUpLogin.tsx/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate=useNavigate();
  return <div className={`h-[100vh] w-[100vw] overflow-hidden relative`}>
      <Button className="!absolute left-5 z-10" onClick={() => navigate("/")} my='md' leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light" >Home</Button>
      <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname==='/signup'?'-translate-x-1/2':'translate-x-0' }`}>
      <Login />
        <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname==="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex gap-5 items-center justify-center flex-col`}>
            <div className="flex gap-1 items-center text-bright-sun-400" >
                <IconAnchor stroke={2.5} className="h-16 w-16"/>
            <div className="text-6xl font-semibold">EliteHire</div>
            
        
      </div>
      <div className="text-2xl text-mine-shaft-200 font-semibold">Find the made for you </div>
      </div>
      <SignUp />
    </div>
    
    
</div>

}
export default SignUpPage;