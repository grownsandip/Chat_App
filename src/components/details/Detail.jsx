import React from "react";
import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";
import { arrayRemove, doc, updateDoc, arrayUnion } from "firebase/firestore";
const Detail = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } =
  useChatStore();
  console.log(isCurrentUserBlocked,isRecieverBlocked)
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
      </div>
      <div className="info">
        <div className="options">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoitems">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                />
                <span>photo 2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitems">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                />
                <span>photo 2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitems">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                />
                <span>photo 2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitems">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                />
                <span>photo 2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitems">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                />
                <span>photo 2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isRecieverBlocked
            ? "user Blocked!"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Detail;
