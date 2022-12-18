import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const getNotes = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "All Notes" });
};

const createNote = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(201).json({ message: "Note Created" });
};

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case "GET":
      getNotes(req, res);
      break;
    case "POST":
      createNote(req, res);
      break;
    default:
      res.status(405).json({ error: "Only GET and POST methods are allowed" });
      break;
  }
};

export default handler;
