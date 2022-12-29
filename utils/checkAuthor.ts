import { NextApiResponse } from "next";
import { Session } from "next-auth";
import { INote } from "../types/note";

export const checkAuthor = (
  res: NextApiResponse,
  note: INote,
  session: Session
) => {
  if (note._id !== session.user._id) {
    return res
      .status(403)
      .json({ error: "You are not permitted to perform this operation" });
  }
};
