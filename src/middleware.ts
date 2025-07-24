import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // redirect ke halaman login jika belum auth
  },
});

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
