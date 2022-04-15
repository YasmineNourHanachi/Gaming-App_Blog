import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  const PF = "/images/";

  return (
    <div className="Post">
      {post && post.photo && (
        <img className="postImg" src={PF + post.photo} alt="img gaming" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories &&
            post.categories.map((c) => (
              <span className="postCats">{c.name}</span>
            ))}
        </div>
        <Link to={`/api/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
