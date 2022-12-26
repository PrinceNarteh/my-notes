import db from "../../../config/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { formatMongoDBErrors } from "../../../utils/formatMongoDBErros";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      await db.connect();
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      console.log(user);
      res.status(201).json({ user });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).json({ error: "Email already in used" });
      }
      const errors = formatMongoDBErrors(error, "User");
      res.status(400).json({ errors });
    }
  } else {
    return res.status(405).json({ error: "Only POST method is allowed" });
  }
}

export default handler;
