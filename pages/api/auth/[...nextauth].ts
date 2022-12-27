import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import db from "../../../config/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { loginDto } from "../../../utils/validation";

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials, req) {
        const result = loginDto.safeParse(credentials);
        if (!result.success) {
          throw new Error("Please provide all info.");
        }
        const { email, password } = result.data;

        await db.connect();
        const user = await User.findOne({ email });
        await db.disconnect();

        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
