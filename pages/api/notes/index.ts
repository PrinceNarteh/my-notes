import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import dbConnect from "../../../config/dbConnect";
import Note from "../../../models/Note";
import { formatMongoDBErrors } from "../../../utils/formatMongoDBErrors";

const getNotes = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const notes = await Note.find({ author: session.user._id }).sort({ _id: -1 });
  res.status(200).json({ notes });
};

const createNote = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    const note = await Note.create({ ...req.body, author: session.user._id });
    res.status(200).json({ note });
  } catch (error: any) {
    const errorArr = formatMongoDBErrors(error, "Note");
    res.status(400).json({ errorArr });
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const method = req.method;

  await dbConnect();

  switch (method) {
    case "GET":
      await getNotes(req, res, session);
      break;
    case "POST":
      await createNote(req, res, session);
      break;
    default:
      res.status(405).json({ error: "Only GET and POST methods are allowed." });
      break;
  }
};

export default handler;
