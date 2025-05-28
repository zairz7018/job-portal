import { Anchor, Button, Checkbox, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
// import { LoginUser } from "../Services/UserService";
import { LoginValidation } from "../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { ErrorNotification, SuccessNotification } from "../Services/NotificationService";
import { setJwt } from "../Slices/JwtSlice";
import { LoginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";

const form={
  email:"",
  password:""
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch(); 
  const [data, setData] = useState<{[key:string]:string}>(form);
  const [formError, setFormError] = useState<{[key:string]:string}>(form);
  const [opened,{open,close}] = useDisclosure(false);
  const navigate=useNavigate();


    const handleChange=(event:any)=>{
      setFormError({...formError , [event.target.name]:""});
      setData({...data, [event.target.name]:event.target.value});
    }
    const handleSubmit=()=>{
      setLoading(true);
      let valid = true, newFormError:{[key:string]:string}={};
    for(let key in data){
      newFormError[key]=LoginValidation(key, data[key]);
      if(newFormError[key])valid=false;
    }
    setFormError(newFormError);
    if(valid){
      setLoading(true);
      LoginUser(data).then((res)=>{
        SuccessNotification("Login Success", "Redirecting to Home");
                dispatch(setJwt(res.jwt));
                localStorage.setItem("token", res.jwt);
                const decoded = jwtDecode(res.jwt);
                console.log(decoded);
                  dispatch(setUser({...decoded , email:decoded.sub}));
                setTimeout(() => {
                  
                  navigate("/");
                },4000 );
      }).catch((err)=>{
        setLoading(false);    
        ErrorNotification("Login Failed", err.response.data.errorMessage);
      });
    }
      
    }


  return <>
  <LoadingOverlay  visible={loading} 
  zIndex={1000} 
  overlayProps={{radius:'sm' , blur:2}} 
  loaderProps={{color:"brightSun.4" , type:"bars"}}
  />
  <div className="w-1/2 sm-mx:w-full px-20 flex flex-col justify-center  gap-3  bs-mx:px-10 sm-mx:px-5">
  <div className="text-2xl font-semibold "> Login</div>
  
  <TextInput error={formError.email} value={data.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt style={{width: rem(18) , height: rem(16)}} />} label="Email " placeholder="Your email" />
  <PasswordInput error={formError.password} value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Password"  placeholder="Password" />
  
  <Checkbox autoContrast label={<>I accept{' '}<Anchor>tesms & conditions</Anchor> </>} />
  <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
  <div className="mx-auto sm-mx:text-sm xs-mx:text-xs">Don't Have a Account ? <span onClick={()=>{navigate("/signup"); setData(form);setFormError(data)}} className="cursor-pointer text-bright-sun-400 hover:underline" >SignUp</span></div>
  <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password ?</div>

  

 
</div>
 
  <ResetPassword  opened={opened} close={close}/>
</>
  
}
export default Login;