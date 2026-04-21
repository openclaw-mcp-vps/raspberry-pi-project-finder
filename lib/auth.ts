import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  accessCode: z.string().min(4)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        accessCode: { label: "Access Code", type: "password" }
      },
      authorize: async (rawCredentials) => {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          return null;
        }

        const expectedCode = process.env.DEMO_ACCESS_CODE ?? "maker-pass";
        if (parsed.data.accessCode !== expectedCode) {
          return null;
        }

        return {
          id: parsed.data.email,
          email: parsed.data.email,
          name: parsed.data.email.split("@")[0]
        };
      }
    })
  ],
  pages: {
    signIn: "/"
  }
});
