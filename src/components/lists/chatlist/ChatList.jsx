import React, { useState } from 'react'
import"./chatlist.css";
import AddUser from '../../addUser/AddUser';
const ChatList = () => {
    const [addMode,setAddMode]=useState(false)
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='search'></input>
        </div>
        <img src={addMode?"./minus.png":"./plus.png"} alt="" className='add'onClick={()=>setAddMode((prev)=>!prev)}/>
      </div>
      <div className="items">
        <img src="./avatar.png" alt=""/>
        <div className="texts">
            <span>Sandip Roy</span>
            <p>Hello this is the most recent message.</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt=""/>
        <div className="texts">
            <span>Sandip Roy</span>
            <p>Hello this is the most recent message.</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt=""/>
        <div className="texts">
            <span>Sandip Roy</span>
            <p>Hello this is the most recent message.</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt=""/>
        <div className="texts">
            <span>Sandip Roy</span>
            <p>Hello this is the most recent message.</p>
        </div>
      </div>
      {addMode && <AddUser/>}
    </div>
  )
}

export default ChatList
