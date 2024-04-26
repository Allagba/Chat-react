import React from "react";
import "./Userinfo.css";

const Userinfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h3 className="username">John Doe</h3>
      </div>
      <div className="icons">
        <img src="./more.png" alt="more" />
        <img src="./video.png" alt="search" />
        <img src="./edit.png" alt="settings" />
      </div>
    </div>
  );
};

export default Userinfo;
