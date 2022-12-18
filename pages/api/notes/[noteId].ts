import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const getNote = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Get Single Note" });
};

const updateNote = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(201).json({ message: "Update Note" });
};

const deleteNote = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(201).json({ message: "Delete Note" });
};

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case "GET":
      getNote(req, res);
      break;
    case "PATCH":
      updateNote(req, res);
      break;
    case "DELETE":
      deleteNote(req, res);
      break;
    default:
      res
        .status(405)
        .json({ error: "Only GET, PATCH and DELETE methods are allowed" });
      break;
  }
};

export default handler;
