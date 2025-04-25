import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../Services/UserService";
const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",
}

const SignUp = () => {
  const [data, setData] = useState(form);
  const handleChange=(event:any)=>{
    if(typeof(event)=="string")setData({...data, accountType:event});
    else setData({...data, [event.target.name]:event.target.value});
  }
  const handleSubmit=()=>{
    RegisterUser(data).then((res)=>{
      console.log(res);
    }).catch((err)=>console.log(err));
  }


  return <div className="w-1/2 px-20 flex flex-col justify-center  gap-3">
    <div className="text-2xl font-semibold "> Create Account</div>
    <TextInput value={data.name} name="name" onChange={handleChange} withAsterisk label="Full Name" placeholder="Your Name"/>
    <TextInput value={data.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt style={{width: rem(18) , height: rem(16)}} />} label="Email " placeholder="Your email" />
    <PasswordInput value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Password"  placeholder="Password" />
    <PasswordInput value={data.confirmPassword} name="confirmPassword" onChange={handleChange} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Confirm Password"  placeholder="Confirm Password" />
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
    <Button onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
    <div className="mx-auto">Have a Account ? <Link to="/login" className="text-bright-sun-400 hover:underline" >login</Link></div>

    
  </div>
}
export default SignUp;