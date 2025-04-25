import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "../Services/UserService";
const form={
  email:"",
  password:""
}

const Login = () => {
  const [data, setData] = useState(form);
    const handleChange=(event:any)=>{
      setData({...data, [event.target.name]:event.target.value});
    }
    const handleSubmit=()=>{
      LoginUser(data).then((res)=>{
        console.log(res);
      }).catch((err)=>console.log(err.response.data));
    }


  return <div className="w-1/2 px-20 flex flex-col justify-center  gap-3">
  <div className="text-2xl font-semibold "> Create Account</div>
  
  <TextInput value={data.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt style={{width: rem(18) , height: rem(16)}} />} label="Email " placeholder="Your email" />
  <PasswordInput value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Password"  placeholder="Password" />
  
  <Checkbox autoContrast label={<>I accept{' '}<Anchor>tesms & conditions</Anchor> </>} />
  <Button onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
  <div className="mx-auto">Don't Have a Account ? <Link to="/signup" className="text-bright-sun-400 hover:underline" >SignUp</Link></div>

  
</div>
}
export default Login;