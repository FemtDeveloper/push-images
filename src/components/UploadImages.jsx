import React, { useState } from "react";
import { storage } from "../firebase";
import "./UploadImages.css";

const UploadImages = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((urlImage) => {
            setUrl(urlImage);
            console.log(url);
          });
      }
    );
    setUrl("");
  };

  return (
    <div className="container">
      <form>
        <div className="input-container">
          <input type="file" onChange={handleChange} autoFocus />
          <div className="wrapper">
            {image ? <p>{image.name}</p> : <p>Select file</p>}
          </div>
        </div>
        <button onClick={handleUpload}>Upload</button>
      </form>
      <h2>
        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        ) : null}
      </h2>
    </div>
  );
};

export default UploadImages;
