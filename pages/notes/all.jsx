import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

const AllNotes = () => {
  const { pathname } = useRouter();

  console.log(pathname);

  return <Layout />;
};

export default AllNotes;
