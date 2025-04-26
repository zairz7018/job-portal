import axios from "axios"

const base_url = 'http://localhost:8080/users/'
const RegisterUser = async(User:any)=>{
  return axios.post(`${base_url}register` , User)
  .then(res=>res.data)
  .catch(error=>{throw error;});
}

const LoginUser =async(login:any)=>{
  return axios.post(`${base_url}login` ,login)
  .then(res=>res.data)
  .catch(error=>{throw error;});
}

export {RegisterUser,LoginUser};