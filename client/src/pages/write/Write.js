import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  console.log({ user });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/api/posts", newPost);
      // console.log(res);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="img post"
        />
      )}
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className=" writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autofocus={true}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell us about your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
        </div>
        <button className="writeSubmit" type="button" onClick={handleSubmit}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
