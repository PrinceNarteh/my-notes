import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

const NoteDetail = () => {
  const { query } = useRouter();

  return <Layout>NoteDetail - {query.noteId}</Layout>;
};

export default NoteDetail;
