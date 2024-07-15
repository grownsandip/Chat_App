import { useEffect } from "react";
import Chat from "./components/chats/Chat"
import Detail from "./components/details/Detail"
import List from "./components/lists/List"
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const {currentUser,isLoading,fetchUserInfo}=useUserStore();
  const {chatId}=useChatStore();
  useEffect(()=>{
    const unSub=onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid)
    });
    return ()=>{
      unSub();
    }
  },[fetchUserInfo])
 // console.log(currentUser)
  if(isLoading)return <div className="loading" >loading...</div>
  return (
    <div className='container'>
      {
       currentUser?(
        <>
      <List/>
      {chatId && <Chat/>}
      {chatId && <Detail/>}
      </>):(<Login/>)
      }
      <Notification/>
    </div>
)
}

export default App