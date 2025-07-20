import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Try to find a regular user first
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (user) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) {
            return { id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: "user" };
          }
        }

        // If not a regular user, try to find a doctor
        const doctor = await prisma.doctor.findUnique({ where: { email: credentials.email } });

        if (doctor) {
          const isValidPassword = await bcrypt.compare(credentials.password, doctor.password);
          if (isValidPassword) {
            return { id: doctor.id, name: `${doctor.firstName} ${doctor.lastName}`, email: doctor.email, role: "doctor" };
          }
        }

        return null; // No user or doctor found with valid credentials
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Add role to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

console.log("NEXTAUTH_SECRET in NextAuth config:", process.env.NEXTAUTH_SECRET ? "Set" : "Not Set");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };