import { IconAnchor } from "@tabler/icons-react";
import SignUp from "../SignUpLogin.tsx/SignUp";
import Login from "../SignUpLogin.tsx/Login";
import { useLocation } from "react-router-dom";

const SignUpPage = () => {
  const location = useLocation();
  return <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4 overflow-hidden">
    {/* <Divider size="xs"  />         */}
    <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname=='/signup'?'-translate-x-1/2':'translate-x-0' }`}>
      <Login />
        <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex gap-5 items-center justify-center flex-col`}>
            <div className="flex gap-1 items-center text-bright-sun-400" >
                <IconAnchor stroke={2.5} className="h-16 w-16"/>
            <div className="text-6xl font-semibold">JobHook</div>
            
        
      </div>
      <div className="text-2xl text-mine-shaft-200 font-semibold">Find the made for you </div>
      </div>
      <SignUp />
    </div>
    
    
</div>

}
export default SignUpPage;