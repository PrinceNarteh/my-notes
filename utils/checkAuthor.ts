import { NextApiResponse } from "next";
import { Session } from "next-auth";
import { INote } from "../types/note";

export const checkAuthor = (
  res: NextApiResponse,
  note: INote,
  session: Session
) => {
  if (note.author !== session.user._id) {
    res
      .status(403)
      .json({ error: "You are not permitted to perform this operation" });
    return;
  }
};
