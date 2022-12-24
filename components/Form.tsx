import dynamic from "next/dynamic";
import React, { FormEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { httpClient } from "../services/httpClient";
import axios from "axios";
import { INote } from "../types";

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Form = ({ selectedNote }: { selectedNote?: INote }) => {
  let [note, setNote] = useState({
    _id: selectedNote?._id || null,
    title: selectedNote?.title || "",
    content: selectedNote?.content || "",
  });
  const [error, setError] = useState("");

  const handleQuillChange = (value: string) =>
    setNote((prevState) => ({
      ...prevState,
      content: value,
    }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res;
      if (note._id) {
        res = await axios.patch("http://localhost:3000/api/notes", note);
      } else {
        res = await axios.post("http://localhost:3000/api/notes", note);
      }
      console.log(res);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h3 className="text-center text-3xl mt-5 font-semibold text-blue-800">
        {note._id ? "Edit" : "Add"} Note
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-xl mb-3">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-500 outline-none w-full rounded-md px-2 py-1 mb-5"
            value={note.title}
            onChange={(e) =>
              setNote({
                ...note,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="h-[400px]">
          <label htmlFor="title" className="block text-xl mb-3">
            Content
          </label>
          <ReactQuill
            key="quill"
            theme="snow"
            style={{ maxHeight: "300px", height: "300px" }}
            defaultValue={note.content}
            onChange={(value) => handleQuillChange(value)}
            modules={modules}
            formats={formats}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full float-right"
          >
            {note._id ? "Update" : "Add"} Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
