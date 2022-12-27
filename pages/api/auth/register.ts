import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import db from "../../../config/dbConnect";
import User from "../../../models/User";

const createUserDto = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, "Password should be 5 or more characters"),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method is allowed" });
  }

  try {
    const result = createUserDto.safeParse(req.body);

    if (!result.success) {
      const { errors } = result.error;
      const errorsArr = errors.map((err) => err.message);
      return res.status(400).json({ errors: errorsArr });
    } else {
      const { email, firstName, lastName, password } = result.data;
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
    }
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ errors: ["Email already in used"] });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
