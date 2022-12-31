import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "../../../config/dbConnect";
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

        await dbConnect();
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user._id = token?._id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
