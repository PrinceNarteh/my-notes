"use client";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";
import Layout from "../../../components/Layout";
import { selectAllNotes } from "../../../state/features/notes/noteSlice";
import Form from "../../../components/Form";

const EditNote = () => {
  const { query } = useRouter();
  const allNotes = useSelector(selectAllNotes);

  const note = allNotes.notes.find((note) => note._id === query.noteId);
  return (
    <Layout>
      <Form selectedNote={note} />
    </Layout>
  );
};

EditNote.auth = true;
export default EditNote;
