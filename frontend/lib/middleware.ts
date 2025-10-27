export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/todos"],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
