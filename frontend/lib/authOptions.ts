import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize credentials:", credentials);
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        console.log("Response:", data);
        if (!res.ok || !data.access_token) {
          return null;
        }

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          accessToken: data.access_token,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }

      if (account?.provider === "google" || account?.provider === "github") {
        const providerAccessToken = account.access_token;
        const res = await fetch("http://localhost:3000/auth/oauth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email ?? account.email,
            name: user?.name ?? account.name,
            provider: account.provider,
            providerId: account.providerAccountId,
          }),
        });
        const data = await res.json();
        token.accessToken = data.access_token;
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
