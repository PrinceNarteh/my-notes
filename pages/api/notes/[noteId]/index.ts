import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import dbConnect from "../../../../config/dbConnect";
import Note from "../../../../models/Note";
import { checkAuthor } from "../../../../utils/checkAuthor";

const getNote = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const note = await Note.findById(req.query.noteId);

    if (!note) {
      res.status(404).json({ error: "Note not found." });
    } else {
      res.status(200).json({ note });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateNote = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    let note = await Note.findById(req.query.noteId);

    if (!note) {
      res.status(404).json({ error: "Note not found." });
    }

    if (note.author.toString() !== session.user._id) {
      res
        .status(403)
        .json({ error: "You are not permitted to perform this operation" });
      return;
    }

    note = await Note.findByIdAndUpdate(req.query.noteId, req.body, {
      new: true,
    });

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteNote = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    let note = await Note.findById(req.query.noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.author.toString() !== session.user._id) {
      res
        .status(403)
        .json({ error: "You are not permitted to perform this operation" });
      return;
    }

    await Note.findByIdAndDelete(req.query.noteId);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
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
      await getNote(req, res);
      break;
    case "PATCH":
      await updateNote(req, res, session);
      break;
    case "DELETE":
      await deleteNote(req, res, session);
      break;
    default:
      res
        .status(405)
        .json({ error: "Only GET, PATCH and DELETE methods are allowed" });
      break;
  }
};

export default handler;
