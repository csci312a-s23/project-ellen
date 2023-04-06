import React, { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./PostCreator.module.css";

export default function PostCreator() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [myID, setMyID] = useState("");

  // eslint-disable-next-line no-unused-vars
  const submitPost = () => {
    fetch("/api/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: description,
        // TODO need to conditionally give ID depending on anonomous check. If anonomous, pass null instead.
        posterID: myID,
      }),
    });
  };

  return (
    <div>
      <button
        type="button"
        className={styles.openCreator}
        onClick={() => setOpen((o) => !o)}
      >
        New Post
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className={styles.modal}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <div className={styles.content}>
            <h2>New Post</h2>
          </div>
        </div>
      </Popup>
    </div>
  );
}
