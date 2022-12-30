"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import {
  toggleTrash,
  deleteNote,
  toggleFavorite,
} from "../../../services/notes";
import {
  filterNotes,
  replaceNote,
  deleteNote as deleteNoteAction,
  selectAllNotes,
} from "../../../state/features/notes/noteSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImUndo2 } from "react-icons/im";
import { MdDeleteSweep } from "react-icons/md";

const NoteDetails = () => {
  const router = useRouter();
  const allNotes = useSelector(selectAllNotes);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { query } = useRouter();

  const note = allNotes.notes.find((note) => note._id === router.query.noteId);

  const category = query.category as string;

  const handleToggleFavorite = async (id: string) => {
    try {
      const res = await toggleFavorite(id);
      dispatch(replaceNote(res));
      router.push(`/${router.query.category}/${res._id}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleTrash = async (id: string) => {
    try {
      await toggleTrash(id);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      dispatch(deleteNoteAction(id));
      router.push("/trash");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await toggleTrash(id);
      console.log(res);
      dispatch(replaceNote(res));
      router.push("/trash");
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    dispatch(filterNotes(category));
  }, [category]);

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
            <div
              className="absolute right-0 top-1 cursor-pointer"
              onClick={() => handleToggleFavorite(note._id!)}
            >
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
            {note.trash ? (
              <div className="hidden absolute bottom-5 space-y-2 pb-10 transition-[display] group-hover:inline-block">
                <div className="relative">
                  <div
                    className="relative p-4 bg-blue-500 rounded-full duration-300 peer hover:scale-110"
                    onClick={() => handleRestore(note._id!)}
                  >
                    <ImUndo2 className="text-white font-bold" />
                  </div>
                  <span className="absolute top-2 right-14 hidden peer-hover:inline-block whitespace-nowrap bg-slate-700 px-2 py-1 rounded text-white">
                    Restore
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="relative p-4 bg-blue-500 rounded-full duration-300 peer hover:scale-110"
                    onClick={() => handleDelete(note._id!)}
                  >
                    <MdDeleteSweep className="text-white" />
                  </div>
                  <span className="absolute top-2 right-14 hidden peer-hover:inline-block whitespace-nowrap bg-slate-700 px-2 py-1 rounded text-white">
                    Delete
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden absolute bottom-5 space-y-1 pb-10 transition-[display] group-hover:inline-block">
                <Link href={`/${category}/${note._id}/edit`}>
                  <div className="relative p-4 bg-blue-500 rounded-full duration-300 peer hover:scale-110">
                    <FiEdit className="text-white font-bold" />
                  </div>
                  <span className="absolute top-2 right-14 hidden peer-hover:inline-block whitespace-nowrap bg-slate-700 px-2 py-1 rounded text-white">
                    Edit
                  </span>
                </Link>
                <div className="relative">
                  <div
                    className="p-4 bg-blue-500 rounded-full duration-300 peer hover:scale-110"
                    onClick={() => handleTrash(note._id!)}
                  >
                    <FaTrash className="text-white" />
                  </div>
                  <span className="absolute top-2 right-14 hidden peer-hover:inline-block whitespace-nowrap bg-slate-700 px-2 py-1 rounded text-white">
                    Trash
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
};
NoteDetails.auth = true;
export default NoteDetails;
