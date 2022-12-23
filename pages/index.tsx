import { useState, useEffect } from "react";
import Head from "next/head";
import Main from "../components/Main";
import Preview from "../components/Preview";
import SideBar from "../components/SideBar";
import { useDispatch } from "react-redux";
import { getNotes } from "../services/notes";
import { setNotes } from "../state/features/notes/noteSlice";

export default function Home() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const notes = async () => {
      const res = await getNotes();
      dispatch(setNotes(res));
    };
    notes();
  }, []);
  return (
    <>
      <Head>
        <title>My Notes</title>
        <meta name="description" content="Web application for taking notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-400 p-5">
        <div className="flex relative w-[calc(100vw_-_40px)] h-[calc(100vh_-_40px)] mx-auto h-50 bg-white rounded-2xl">
          <SideBar open={open} setOpen={setOpen} />
          <Preview open={open} />
          <Main />
        </div>
      </main>
    </>
  );
}
