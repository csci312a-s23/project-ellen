import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/Users";
import { getDirectoryInfo, getDepartmentList } from "@/lib/middscrapers";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified && profile.email.endsWith("@middlebury.edu")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user }) {
      if (user) {
        let localUser = await User.query().findOne("googleID", user.id);
        if (!localUser) {
          // Create new user record in the database
          //gather user info from midd directory
          const info = await getDirectoryInfo({ email: user.email });
          //get username from email
          const username = user.email.split("@")[0]; //This doesn't have any safety checks, but we're relying on Midd not putting any funky emails in the directory

          //if the user type if 'Faculty' check if their department is in the department list
          if (info.type === "Faculty") {
            const departmentList = await getDepartmentList({ season: "S23" });
            if (!departmentList.includes(info.department)) {
              info.type = "Administration";
            }
          }

          localUser = await User.query().insertAndFetch({
            id: info.id,
            googleID: user.id,
            username: username,
            email: user.email,
            firstName: info.firstName,
            lastName: info.lastName,
            type: info.type,
            classYear: info.gradYear,
            department: info.department,
          });
        }
        // Add user id to the token
        token.name = localUser.username;
        token.id = localUser.id;
        token.isAdmin = localUser.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id to the session
      session.user.name = token.name;
      session.user.id = token.id;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
};

export default NextAuth(authOptions);
