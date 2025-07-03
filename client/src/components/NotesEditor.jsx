import React, { useState } from "react";
import { Editor } from "primereact/editor";
import axios from "axios";
import { useEffect } from "react";

const NotesEditor = ({ note, getNotes }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const updateNote = async () => {
    await axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/note/update`,
        {
          id: note?._id,
          content: content, // Use existing content if not provided
          title: title || note?.title, // Use existing title if not provided
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          getNotes(); // Refresh the notes list after updating
        }
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateNote();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [content, title]); // Update note when content or title changes
  return (
    <div>
      <input
        type="text"
        name="name"
        id="name"
        defaultValue={note?.title || "Title"}
        onChange={(e) => setTitle(e.target.value)}
        className=" text-3xl text-gray-500 font-medium px-3 py-3 w-full focus:outline-none"
      />
      <Editor
        value={note?.content}
        placeholder="Write your text here..."
        onTextChange={(e) => {
          setContent(e.htmlValue);
        }}
        style={{
          height: "87vh",
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "1.2rem",
          fontFamily: "Arial, sans-serif",
        }}
      />
    </div>
  );
};

export default NotesEditor;
