import axiosInstance from "../Interceptor/AxiosInterceptor";
const base_url = "http://localhost:8080/notification/";

const getNotifications = async (id: number) => { // ✅ Typage strict
  if (!id) {
    console.log("ID cannot be undefined"); // Bloque explicitement
  }
  return axiosInstance.get(`/notification/get/${id}`)
    .then(result => result.data)
    .catch(error => {
      console.error("Notification Error:", error.response?.data);
      throw error;
    });
}
const readNotification= async(id:any)=>{
  return axiosInstance.put(`${base_url}read/${id}`)
  .then(result=>result.data)
  .catch(error=>{throw error;});
}
export {getNotifications , readNotification};