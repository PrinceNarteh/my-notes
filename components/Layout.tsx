import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Main from "../components/Main";
import Preview from "../components/Preview";
import SideBar from "../components/SideBar";
import { getNotes } from "../services/notes";
import { setNotes } from "../state/features/notes/noteSlice";
import Spinner from "./Spinner";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const { status } = useSession({ required: true });
  const dispatch = useDispatch();

  if (status === "loading") {
    console.log("Loading...");

    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner additionalStyle="text-5xl" />
      </div>
    );
  }

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
          <Main>{children}</Main>
        </div>
      </main>
    </>
  );
}
Layout.auth = true;
