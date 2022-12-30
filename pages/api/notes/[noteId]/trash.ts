import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "../../../../config/dbConnect";
import Note from "../../../../models/Note";
import { checkAuthor } from "../../../../utils/checkAuthor";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
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

    return checkAuthor(res, note, session);

    note = await Note.findByIdAndUpdate(
      req.query.noteId,
      {
        $set: { trash: !note.trash },
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
