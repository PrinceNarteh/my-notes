import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { getNotes } from "../services/notes";
import { setNotes } from "../state/features/notes/noteSlice";
import { ToastContainer, toast } from "react-toastify";

export default function Home({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const notes = async () => {
      const res: any = await getNotes();
      if (res.status === 200) {
        dispatch(setNotes(res.data.notes));
      } else {
        toast.error("Error fetching data");
      }
    };
    notes();
  }, []);

  return (
    <Layout>
      <ToastContainer />
      {children}
    </Layout>
  );
}
