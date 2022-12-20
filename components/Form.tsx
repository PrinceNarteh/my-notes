import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

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

const Form = () => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleQuillChange = (value: string) =>
    setNote((prevState) => ({
      ...prevState,
      description: value,
    }));

  console.log(note);

  return (
    <div className="space-y-4">
      <h3 className="text-center text-3xl mt-5 font-semibold text-blue-800">
        Add Note
      </h3>
      <form>
        <div>
          <label htmlFor="title" className="block text-xl mb-3">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-500 outline-none w-full rounded-md px-2 py-1"
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
            style={{ minHeight: "300px", height: "200px" }}
            defaultValue={note.description}
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
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
