import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createNote, updateNote } from "../services/notes";
import { addNote, replaceNote } from "../state/features/notes/noteSlice";
import { INote } from "../types/note";

const modules = {
  toolbar: [
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
  const router = useRouter();
  const dispatch = useDispatch();

  const handleQuillChange = (value: string) =>
    setNote((prevState) => ({
      ...prevState,
      content: value,
    }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (note._id) {
        let res = await updateNote(note);
        dispatch(replaceNote(res));
        toast.success("Update successful");
        router.push(`/notes/${res._id}`);
      } else {
        let res = await createNote(note);
        toast.success("Note created successful");
        dispatch(addNote(res));
        router.push(`/`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <ToastContainer />
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
        <div className="absolute right-10 bottom-5">
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
