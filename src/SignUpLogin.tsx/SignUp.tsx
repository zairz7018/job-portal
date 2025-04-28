import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { SignUpValidation } from "../Services/FormValidation";
import { ErrorNotification, SuccessNotification } from "../Services/NotificationService";

const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",
}

const SignUp = () => {
  const [data, setData] = useState<{[key:string]:string}>(form);
  const [formError, setFormError] = useState<{[key:string]:string}>(form);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange=(event:any)=>{
    if(typeof(event)=="string"){
      setData({...data, accountType:event});
      return;
    }
    let name=event.target.name , value=event.target.value;

     setData({...data, [name]:value});
     setFormError({...formError,[name]:SignUpValidation(name,value)})
      if(name==="password" && data.confirmPassword !== ""){
        let err="";
        if(data.confirmPassword!== value) err ="Password does not match. "; 
        setFormError({...formError,[name]:SignUpValidation(name,value),confirmPassword:err})
      }
      if(name==="confirmPassword"){
        if(data.password !== value)setFormError({...formError,[name]:"Password does not match"});
          else setFormError({...formError,confirmPassword:""})
        }
  }
  const handleSubmit=()=>{
    setLoading(true);
    let valid = true, newFormError:{[key:string]:string}={};
    for(let key in data){
      if(key==="accountType")continue;
      if(key!=="confirmPassword")newFormError[key]=SignUpValidation(key, data[key]);
      else if(data[key] !== data["password"])newFormError[key]="Password does not match";
      if(newFormError[key])valid=false;
    }
    
    setFormError(newFormError);
    if(valid===true){
      // setLoading(true);
      RegisterUser(data).then((res)=>{
        console.log(res);
        setData(form);
        setFormError(newFormError);
    
       SuccessNotification("Registration Success", "Redirecting to Login Page");
        setTimeout(() => {
          navigate("/login");
          setLoading(false);
        }, 4000);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
    
        ErrorNotification("Registration Failed", err.response.data.errorMessage);
      });
    }
    
  }


  return <>
    <LoadingOverlay  visible={loading} zIndex={1000} overlayProps={{radius:'sm' , blur:2}} 
      loaderProps={{color:"brightSun.4" , type:"bars"}} className="translate-x-1/2"
      />
   <div className="w-1/2 px-20 flex flex-col justify-center  gap-3">
    <div className="text-2xl font-semibold "> Create Account</div>
    <TextInput value={data.name} error={formError.name} name="name" onChange={handleChange} withAsterisk label="Full Name" placeholder="Your Name"/>
    <TextInput error={formError.email} value={data.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt style={{width: rem(18) , height: rem(16)}} />} label="Email " placeholder="Your email" />
    <PasswordInput error={formError.password} value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Password"  placeholder="Password" />
    <PasswordInput error={formError.confirmPassword} value={data.confirmPassword} name="confirmPassword" onChange={handleChange} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Confirm Password"  placeholder="Confirm Password" />
    <Radio.Group
      value={data.accountType}
      onChange={handleChange}
      label="you Are?"
      withAsterisk
    >
      <Group mt="xs">
      <Radio className="py-4 px-6 border border-mine-shaft-800 hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/10 rounded-lg" autoContrast value="APPLICANT" label="APPLICANT" />
      <Radio className="py-4 px-6 border border-mine-shaft-800 hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/10 rounded-lg" autoContrast value="EMPLOYER" label="EMPLOYER" />
      </Group>
    </Radio.Group>
    <Checkbox  autoContrast label={<>I accept{' '}<Anchor>tesms & conditions</Anchor> </>} />
    <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
    <div className="mx-auto">Have a Account ? <span onClick={()=>{navigate("/login"); setData(form);setFormError(data)}} className="text-bright-sun-400 hover:underline cursor-pointer" >login</span></div>

    
  </div>
  </>
}
export default SignUp;