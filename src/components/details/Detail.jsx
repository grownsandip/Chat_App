import React from "react";
import "./detail.css";
const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>User Name</h2>
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
        <button>Block User</button>
        <button className="logout">LogOut</button>
      </div>
    </div>
  );
};

export default Detail;
