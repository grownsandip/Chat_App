import React, { useEffect, useState } from 'react'
import"./chatlist.css";
import AddUser from '../../addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';
const ChatList = () => {
    const [addMode,setAddMode]=useState(false);
    const[chats,setChats]=useState([]);
    const {currentUser}=useUserStore();
    const {chatId,changeChat}=useChatStore();
    //console.log(chatId)
    useEffect(()=>{
     const unSub=onSnapshot(doc(db,"userchats",currentUser.id),async(res)=>{
      const items=res.data().chats;
      const promises=items.map(async(item)=>{
        const userDocRef=doc(db,"users",item.receiverId);
        const userDocSnap=await getDoc(userDocRef);
        const user=userDocSnap.data();
        return {...item,user};
      });
      const chatData=await Promise.all(promises)
      setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt))
    });
     return ()=>{
      unSub();
     }
    },[currentUser.id])
    console.log(chats);
    const handleSelect=async (chat)=>{
      //console.log(chat.chatId,chat.user)
      const userChats=chats.map(item=>{
        const {user,...rest}=item;
        return rest;
      });
      const chatIndex=userChats.findIndex(
        (item)=>item.chatId===chat.chatId
      );
      userChats[chatIndex].isSeen=true;
      const userChatRef=doc(db,"userchats",currentUser.id);
      try{
       await updateDoc(userChatRef,{
        chats:userChats,
       });
       changeChat(chat.chatId,chat.user)
      }
      catch(err){
        console.log(err);
      }
    }
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='search'></input>
        </div>
        <img src={addMode?"./minus.png":"./plus.png"} alt="" className='add'onClick={()=>setAddMode((prev)=>!prev)}/>
      </div>
      {chats.map((chat)=>(
      <div className="items" key={chat.chatId} onClick={()=>handleSelect(chat)}
      style={{backgroundColor:chat?.isSeen?"transparent":"#5183fe"}}
      >
        <img src={chat.user.avatar || "./avatar.png"} alt=""/>
        <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
        </div>
      </div>
    ))}
      {addMode && <AddUser/>}
    </div>
  )
}

export default ChatList
