import React, { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./PostCreator.module.css";
import ReactSwitch from "react-switch";
//import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useSession } from "next-auth/react";

export default function PostCreator({
  refresh,
  setUnauthorized,
  setAuthMessage,
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [anonPost, setAnonPost] = useState(false);
  const [category, setCategory] = useState(" ");

  const { data: session } = useSession({ required: false });

  const options = [
    { label: "General" },
    { label: "Registration" },
    { label: "Housing" },
    { label: "Dining" },
    { label: "Parking" },
  ];

  // https://www.c-sharpcorner.com/article/how-to-create-a-toggle-switch-in-react/
  const handleChange = (val) => {
    setAnonPost(val);
  };

  const submitPost = async () => {
    closeModal();
    if (!session) {
      setUnauthorized(true);
      setAuthMessage("You must be logged in to create a post.");
      return;
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: description,
        anonymous: anonPost,
        category: category,
      }),
    });

    if (res.status === 401 || res.status === 403) {
      setUnauthorized(true);
      setAuthMessage(res.statusText);
    }

    setCategory(" ");
    setDescription(" ");
    setTitle(" ");
    refresh();
  };

  return (
    <div>
      <div style={{ position: "fixed", bottom: 20, left: 20 }}>
        <Fab
          color="primary"
          aria-label="add"
          className="add-button"
          onClick={() => setOpen((o) => !o)}
        >
          <AddIcon />
        </Fab>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className={styles.modal}>
          <a className={styles.close} onClick={closeModal}>
            &times;
          </a>
          <div className={styles.content}>
            <h1>New Post</h1>
            <div className={styles.titleHolder}>
              <h2 className={styles.title}>Title:</h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.titleInput}
                data-testid="title-input"
              />
            </div>
            <h2>Describe your issue:</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.description}
              data-testid="description-input"
            />
            <h2>Select a category</h2>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-testid="cat-input"
            >
              {options.map((option) => {
                return (
                  <option value={option.label} key={option.label}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.actions}>
            <div className={styles.anonomousHolder}>
              <h3>Anonymous</h3>

              <ReactSwitch
                checked={anonPost}
                onChange={handleChange}
                data-testid="anon-input"
              />
            </div>
            <div className={styles.submitButton} onClick={() => submitPost()}>
              Submit
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}
