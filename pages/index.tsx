"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { getNotes } from "../services/notes";
import { setNotes } from "../state/features/notes/noteSlice";

export default function Home({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const notes = async () => {
      const res = await getNotes();
      dispatch(setNotes(res));
    };
    notes();
  }, []);

  return <Layout>{children}</Layout>;
}
