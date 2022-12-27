import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../services/notes";
import { selectAllNotes, setNotes } from "../state/features/notes/noteSlice";
import PreviewCard from "./PreviewCard";

const Preview = ({ open }: { open: boolean }) => {
  const notesSelector = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  useEffect(() => {
    const notes = async () => {
      const res = await getNotes();
      dispatch(setNotes(res));
    };
    notes();
  }, []);
  return (
    <div
      className={`h-[calc(100vh_-_40px)] overflow-y-auto w-96 bg-gray-800 p-4 text-white duration-300 ${
        open ? "ml-72" : "ml-16"
      }`}
    >
      {/* Search Bar */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex items-center bg-gray-700 rounded-full py-1 px-2 gap-2">
          <RiSearchLine />
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent w-full outline-none"
          />
        </div>
        <div className="">
          <button className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
            <IoMdAdd />
          </button>
        </div>
      </div>

      <h2 className="font-bold text-gray-500 mt-5 ml-6 text-2xl">All Notes</h2>

      <div>
        {notesSelector.notes?.map((note, index) => (
          <PreviewCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Preview;
