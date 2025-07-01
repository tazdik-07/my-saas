import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add your own logic here to validate credentials and return a user object
        // For now, we'll just return a dummy user
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };