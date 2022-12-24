import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { selectAllNotes } from "../../state/features/notes/noteSlice";
import { FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const NoteDetails = () => {
  const { query } = useRouter();
  const allNotes = useSelector(selectAllNotes);

  const note = allNotes.notes.find((note) => note._id === query.noteId);

  if (!note) {
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        Note Not Found
      </div>
    </Layout>;
  } else {
    return (
      <Layout>
        <div className="relative h-full">
          <div>
            <h2 className="text-2xl font-semibold">{note.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
          </div>
          <div className="fixed bg-blue-500 cursor-pointer w-12 h-12 flex items-center justify-center right-10 bottom-10 rounded-full duration-300 group">
            <BsThreeDotsVertical className="text-white" />
            <div className="hidden absolute bottom-5 space-y-1 pb-10 transition-[display] group-hover:inline-block">
              <div className="p-4 bg-blue-500 rounded-full duration-300 group-hover:inline-block hover:scale-110">
                <FiEdit className="text-white font-bold" />
              </div>
              <div className="p-4 bg-blue-500 rounded-full duration-300 hover:scale-110 ">
                <FaTrash className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default NoteDetails;
