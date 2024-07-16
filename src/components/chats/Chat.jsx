import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, getDoc, onSnapshot, updateDoc,arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
//import { arrayUnion } from "firebase/firestore/lite";
import { useUserStore } from "../../lib/userStore";
import { format } from "timeago.js";
import upload from "../../lib/upload";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState();
  const [img,setImg]=useState({
    file:null,
    url:"",
  });
  const handleImg=(e)=>{
    if(e.target.files[0]){
    setImg({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
    })
}
}
  const [text, setText] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, user,isCurrentUserBlocked, isRecieverBlocked } = useChatStore();
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
 // console.log(chats);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
 // console.log(text);
  //console.log(chatId);
 // console.log(chats.messages);
 // console.log(user);
  const handleSend = async () => {
    if (text === "") return;
    let imgUrl=null
    try {
      if(img.file){
        imgUrl=await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: text,
          createdAt: new Date(),
          ...(imgUrl && {img:imgUrl}),
        }),
      });
      const userIDS = [currentUser.id, user.id];
      userIDS.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshots = await getDoc(userChatRef);
        if (userChatsSnapshots.exists()) {
          const userChatsData = userChatsSnapshots.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({
      file:null,
      url:"",
    })
    setText("");
   };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chats?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id?"message own":"message"} key={message?.createdAt}>
            <div className="texts">
            {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              { <span>{format(message.createdAt.toDate())}</span>}
            </div>
          </div>
        ))}
        {img.url && (<div className="message own">
          <div className="texts">
            <img src={img.url} alt=""/>
          </div>
        </div>)}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
          <img src="./img.png" alt="" />
          </label>
          <input type="file" id="file" style={{display:"none"}} onChange={handleImg} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          placeholder={ (isCurrentUserBlocked || isRecieverBlocked) ?"You cannot send message!":"type a message...."}
          className="input"
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isRecieverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isRecieverBlocked}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
