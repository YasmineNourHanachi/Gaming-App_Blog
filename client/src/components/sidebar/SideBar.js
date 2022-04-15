import "./SideBar.css";
import imgameuse from "../../Images/imgameuse.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SideBar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle"> ABOUT</span>
        <img className="sidebarImg" src={imgameuse} alt="gameuse" />
        <p>
          A video game is an electronic game with a user interface that allows
          playful human interaction by generating visual feedback on a video
          device. The video game player has peripherals to act on the game and
          perceive the consequences of his actions on a virtual environment.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarIcon fa-brands fa-youtube-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
