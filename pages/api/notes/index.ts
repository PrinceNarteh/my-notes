import Note from "../../../models/Note";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../config/dbConnect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  const method = req.method;

  if (method === "GET") {
    const notes = await Note.find({});
    res.status(200).json({ notes });
  } else if (method === "POST") {
    res.status(201).json({ message: "Note Created" });
  } else {
    res.status(405).json({ error: "Only GET and POST methods are allowed." });
  }
};

export default handler;
