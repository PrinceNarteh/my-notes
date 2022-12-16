import Head from "next/head";
import Main from "../components/Main";
import Preview from "../components/Preview";
import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Notes</title>
        <meta name="description" content="Web application for taking notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-400 p-5">
        <div className="flex relative w-[calc(100vw_-_40px)] h-[calc(100vh_-_40px)] mx-auto h-50 bg-teal-100 rounded-2xl">
          <SideBar />
          <Preview />
          <Main />
        </div>
      </main>
    </>
  );
}
