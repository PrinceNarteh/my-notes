import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes } from "../state/features/notes/noteSlice";
import PreviewCard from "./PreviewCard";
import { searchNote } from "../state/features/notes/noteSlice";

const Preview = ({ open }: { open: boolean }) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const notesSelector = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchNote(searchWord));
  }, [searchWord]);

  return (
    <div
      className={`h-[calc(100vh_-_40px)] overflow-y-auto w-96 bg-gray-800 p-4 text-white duration-300 ${
        open ? "ml-72" : "ml-16"
      }`}
    >
      {/* Search Bar */}
      <div className="flex-1 flex items-center bg-gray-700 rounded-full py-1 px-2 gap-2">
        <RiSearchLine />
        <input
          type="search"
          placeholder="Search..."
          className="bg-transparent w-full outline-none"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>

      <h2 className="font-bold text-gray-500 mt-5 ml-6 text-2xl">All Notes</h2>

      <div>
        {notesSelector.filteredNotes?.map((note, index) => (
          <PreviewCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Preview;
