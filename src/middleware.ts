import { withAuth } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // /login
  // req.nextUrl.pathname.startsWith("/login")

  if (
    req.nextUrl.pathname == "/users" &&
    token?.role == "Member" &&
    isAuthenticated
  ) {
    console.log("Member Not Allow Users");
    // set session then show in view error
    if (token) {
      token.error = "Member Not Allow Users";
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // @ts-expect-error: authMiddleware type does not match expected signature, but works for Next.js middleware
  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    "/dashboard",
    "/users",
    "/division",
    "/state/:path*",
    "/products/:path*",
    // "/((?!api|_next/static|_next/image|favicon.ico).*)", // kecuali API routes dan static files
  ],
};
