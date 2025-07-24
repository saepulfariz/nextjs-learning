import NextAuth from "next-auth";
import { authOptions } from "@root/auth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
