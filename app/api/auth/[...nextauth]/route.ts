import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@/app/models/User"
import dbConnect from "@/lib/mongo"

import type { NextAuthOptions } from "next-auth"

export const authOptions : NextAuthOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "", 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ","
    })
  ],
  callbacks: {
    async session({session}) {
      return session
    },
    async signIn({ profile, account, user }) {
      console.log("Signed in!")
      try {
        await dbConnect()

        if (profile) {
          // Populate database with user details if not already present.
          const user = await User.findOne({ email: profile.email })

          if (!user) {
            await User.create({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
              numPosts: 0
            })
          }

          return true
        }
        return false
      }
      catch (error) {
        console.error("An error occurred while signing in:", error)
        return false
      }
    },
  }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }