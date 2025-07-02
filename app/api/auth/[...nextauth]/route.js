import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user) {
          return null; // User not found
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          return null; // Invalid password
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };