import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { selectAllNotes } from "../../state/features/notes/noteSlice";

const NoteDetail = () => {
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
        <div>
          <h2 className="text-2xl font-semibold">{note.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
        </div>
      </Layout>
    );
  }
};

export default NoteDetail;
