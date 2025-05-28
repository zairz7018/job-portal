import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin.tsx/SignUp";
import Login from "../SignUpLogin.tsx/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate=useNavigate();
  return <div className={`h-[100vh] w-[100vw] sm-mx:overflow-y-auto overflow-hidden relative`}>
      <Button className="!absolute left-5 z-10" onClick={() => navigate("/")} my='md' leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light" >Home</Button>
              <div className={`  
                transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 relative 
                ${location.pathname==='/signup'?'-translate-x-1/2 sm-mx:-translate-x-full':'translate-x-0' }`}>

      <Login />

        <div className={`w-1/2 h-[100vh] sm-mx:hidden sm-mx:min-h-full flex gap-5 transition-all items-center justify-center flex-col duration-1000 ease-in-out ${location.pathname==="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900  `}>
           
           
            <div className="flex gap-1 items-center text-bright-sun-400" >
                <IconAnchor stroke={2.5} className="h-16 w-16"/>
            <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-semibold">EliteHire</div>
            
        
      </div>
      <div className="text-2xl text-mine-shaft-200 font-semibold bs-mx:text-xl md-mx:text-lg ">Find the made for you </div>
      </div>
      <SignUp />
    </div>
    
    
</div>

}
export default SignUpPage;