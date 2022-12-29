import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { filterNotes } from "../../state/features/notes/noteSlice";

const TrashNotes = () => {
  const { pathname } = useRouter();

  const dispatch = useDispatch();

  const path = pathname.split("/")[2];

  useEffect(() => {
    dispatch(filterNotes(path));
  }, []);

  return <Layout />;
};

export default TrashNotes;
