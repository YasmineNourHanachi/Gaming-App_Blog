import React from "react";
import "./header.css";
import background from "../../Images/background.jpg";

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">The Most Popular</span>
        <span className="headerTitleLg"> Gaming Blog </span>
      </div>
      <img className="headerImg" src={background} alt="background img"></img>
    </div>
  );
}

export default Header;
