import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/dbConnect";
import Note from "../../../models/Note";
import { formatMongoDBErrors } from "../../../utils/formatMongoDBErros";

const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const notes = await Note.find({}).sort({ _id: -1 });
  await db.disconnect();
  res.status(200).json({ notes });
};

const createNote = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  try {
    const note = await Note.create(req.body);
    res.status(200).json({ note });
  } catch (error: any) {
    const errorArr = formatMongoDBErrors(error, "Note");
    res.status(400).json({ errorArr });
  } finally {
    await db.disconnect();
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const method = req.method;

  switch (method) {
    case "GET":
      await getNotes(req, res);
      break;
    case "POST":
      await createNote(req, res);
      break;
    default:
      res.status(405).json({ error: "Only GET and POST methods are allowed." });
      break;
  }
};

export default handler;
