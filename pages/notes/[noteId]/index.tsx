"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import { deleteNote } from "../../../services/notes";
import { selectAllNotes } from "../../../state/features/notes/noteSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const NoteDetails = () => {
  const router = useRouter();
  const allNotes = useSelector(selectAllNotes);
  const [error, setError] = useState("");

  const note = allNotes.notes.find((note) => note._id === router.query.noteId);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

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
          <div className="relative">
            <h2 className="text-2xl font-semibold border-b-2 pb-2">
              {note.title}
            </h2>
            <div className="absolute right-0 top-1 cursor-pointer">
              {note.favorite ? (
                <AiFillHeart className="text-red-500 text-3xl" />
              ) : (
                <AiOutlineHeart className="text-red-500 text-3xl" />
              )}
            </div>
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>
          </div>
          <div className="fixed bg-blue-500 cursor-pointer w-12 h-12 flex items-center justify-center right-10 bottom-10 rounded-full duration-300 group">
            <BsThreeDotsVertical className="text-white" />
            <div className="hidden absolute bottom-5 space-y-1 pb-10 transition-[display] group-hover:inline-block">
              <Link href={`/notes/${note._id}/edit`}>
                <div className="p-4 bg-blue-500 rounded-full duration-300 group-hover:inline-block hover:scale-110">
                  <FiEdit className="text-white font-bold" />
                </div>
              </Link>
              <div
                className="p-4 bg-blue-500 rounded-full duration-300 hover:scale-110"
                onClick={() => handleDelete(note._id!)}
              >
                <FaTrash className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
NoteDetails.auth = true;
export default NoteDetails;
