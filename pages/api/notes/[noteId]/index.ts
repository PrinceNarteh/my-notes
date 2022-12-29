import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import db from "../../../../config/dbConnect";
import Note from "../../../../models/Note";

const getNote = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const note = await Note.findById(req.query.noteId);
    await db.disconnect();
    if (!note) {
      res.status(404).json({ error: "Note not found." });
    } else {
      res.status(200).json({ note });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateNote = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const note = await Note.findByIdAndUpdate(req.query.noteId, req.body, {
      new: true,
    });
    await db.disconnect();
    if (!note) {
      res.status(404).json({ error: "Note not found." });
    } else {
      res.status(200).json({ note });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteNote = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const note = await Note.findByIdAndDelete(req.query.noteId);
    await db.disconnect();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const method = req.method;

  switch (method) {
    case "GET":
      await getNote(req, res);
      break;
    case "PATCH":
      await updateNote(req, res);
      break;
    case "DELETE":
      await deleteNote(req, res);
      break;
    default:
      res
        .status(405)
        .json({ error: "Only GET, PATCH and DELETE methods are allowed" });
      break;
  }
};

export default handler;
