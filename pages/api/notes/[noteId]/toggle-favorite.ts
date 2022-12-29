import db from "../../../../config/dbConnect";
import Note from "../../../../models/Note";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  if (method !== "PATCH") {
    return res.status(405).json({ error: "Only PATCH method is allowed." });
  }
  await db.connect();

  try {
    let note = await Note.findById(req.query.noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    note = await Note.findByIdAndUpdate(
      req.query.noteId,
      {
        $set: { favorite: !note.favorite },
      },
      { new: true }
    );
    res.status(200).json({ note });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnect();
  }
};

export default handler;
