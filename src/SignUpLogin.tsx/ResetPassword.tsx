import { Button, Modal, PasswordInput, PinInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { SignUpValidation } from "../Services/FormValidation";
import { ErrorNotification, SuccessNotification } from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props:any) => {
  const [email,setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [passErr , setPassErr]=useState("");
  const [otpSent , setOtpSent]=useState(false);
  const [otpSending , setOtpSending] = useState(false);
  const [verified , setVerified] = useState(false);
  const [ResendLoader , setResendLoader] = useState(false);
  const [seconds , setSeconds] = useState(60);
  const interval = useInterval(()=>{
    if(seconds===0){
      setResendLoader(false);
      setSeconds(60);
      interval.start();
    }else setSeconds((s)=>s-1)
    setSeconds(s=> s - 1)}
    ,1000);
  
  const handleSendOtp=()=>{
    setOtpSending(true);
    sendOtp(email).then((res)=>{
      console.log(res);
      SuccessNotification("OTP Sent Successfuly", "Enter OTP to reset.");
      setOtpSent(true);
      setOtpSending(false);
      setResendLoader(true);
      interval.start();
    }).catch((err)=>{
      console.log(err);
      setOtpSending(false);
      ErrorNotification("Error", err.response.data.errorMessage);
    })
  }
  const handleverifyOtp=(otp:string)=>{
    verifyOtp(email,otp).then((res)=>{
      console.log(res);
      SuccessNotification("OTP verified", "Enter new Password :");
      setVerified(true);
    }).catch((err)=>{
      console.log(err);
      ErrorNotification("OTP verification failed", err.response.data.errorMessage);
    })
  }
  const resendOtp=()=>{
    if(ResendLoader)return;
    handleSendOtp();
  }
  const chnageEmail=()=>{
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  }
  const handleResetPassword=()=>{
    changePass(email,password).then((res)=>{
      console.log(res);
      SuccessNotification("Password Changed", "You can now login with new password.");
      props.close();

    }).catch((err)=>{
      console.log(err);
      ErrorNotification("Password Reset Failed", err.response.data.errorMessage);

    })
  }

  return <Modal opened={props.opened} onClose={props.close} title="Reset Password">
        <div className="flex flex-col gap-6">
            <TextInput value={email} name="email" onChange={(e)=>{setEmail(e.target.value)}} withAsterisk leftSection={<IconAt  style={{width:rem(18) , height: rem(16)}} />} label="Email " placeholder="Your email" size="md" 
            rightSection={<Button loading={otpSending && !otpSent} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={email===""|| otpSent} variant="filled" >Login</Button>}rightSectionWidth="xl"/>
            {
              otpSent && <PinInput onComplete={handleverifyOtp} length={6} className="mx-auto" size="md" gap="lg" type="number" />
            }
            {
              otpSent && !verified &&
              <div className="flex gap-2">
                <Button fullWidth loading={otpSending} onClick={resendOtp} autoContrast color="brightSun.4" variant="light" >{ResendLoader ? seconds : "Resend"} </Button>
                <Button fullWidth onClick={chnageEmail} autoContrast  >Change Email</Button>
              </div>
            }
            {
              verified &&
              <PasswordInput error={passErr} value={password} name="password" onChange={(e)=>{setPassword(e.target.value); setPassErr(SignUpValidation("password", e.target.value))}} withAsterisk leftSection={<IconLock style={{width: rem(18) , height: rem(18)}} stroke={1.5} />} label="Password"  placeholder="Password" />
            }
            {
              verified &&
              <Button  variant="filled" onClick={handleResetPassword} autoContrast  >Change Email</Button>
            }
        </div>
  </Modal>
}
export default ResetPassword;