import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "../../components/Layout";
import { filterNotes } from "../../state/features/notes/noteSlice";

const AllNotes = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  let category = query.category as string;
  category = category === undefined ? "all" : category;

  useEffect(() => {
    dispatch(filterNotes(category));
  }, [category]);

  return <Layout />;
};

export default AllNotes;
