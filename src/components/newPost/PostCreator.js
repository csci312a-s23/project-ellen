import React, { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./PostCreator.module.css";
import ReactSwitch from "react-switch";

export default function PostCreator() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [myID, setMyID] = useState("");
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState(" ");

  const options = [
    { label: "Food" },
    { label: "Registration" },
    { label: "Professors" },
    { label: "Teachers" },
    { label: "Other" },
  ];

  // https://www.c-sharpcorner.com/article/how-to-create-a-toggle-switch-in-react/
  const handleChange = (val) => {
    setChecked(val);
  };

  const submitPost = () => {
    closeModal();
    fetch("/api/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: description,
        posterID: checked ? "0000" : myID,
        category: category,
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
              />
            </div>
            <h2>Describe your issue:</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.description}
            />
            <h2>Select a category</h2>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <h3>Anonomous</h3>
              <ReactSwitch checked={checked} onChange={handleChange} />
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