import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import type { OAuthConfig } from "next-auth/providers/oauth";

type InfomaniakProfile = {
  sub: string;
  name: string;
  email: string;
};

const InfomaniakProvider: OAuthConfig<InfomaniakProfile> = {
  id: "infomaniak",
  name: "Infomaniak",
  type: "oauth",
  clientId: process.env.NEXT_PUBLIC_INFOMANIAK_CLIENT_ID || "",
  clientSecret: process.env.INFOMANIAK_CLIENT_SECRET || "",
  authorization: "https://accounts.infomaniak.com/oauth2/authorize",
  token: "https://accounts.infomaniak.com/oauth2/token",
  userinfo: "https://api.infomaniak.com/userinfo",
  profile(profile: InfomaniakProfile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
    };
  },
};

export const authOptions: NextAuthOptions = {
  providers: [InfomaniakProvider],
  pages: {
    signIn: "/signin",  // Custom sign-in page
    error: "/auth/error", // Optional: Custom error page
  },
  callbacks: {
    async signIn({ user }) {
      return user?.email?.endsWith("@sangadee.com") ?? false;
    },
    async redirect({ url, baseUrl }) {
      // Redirect user to the admin page after successful login
      return baseUrl + "/admin";
    },
  },
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
