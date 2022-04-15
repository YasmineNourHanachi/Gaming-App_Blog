import "./home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
}

export default Home;
