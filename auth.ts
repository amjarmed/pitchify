import { client } from '@/sanity/lib/client';
import { authorQuery } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
/**
 * NextAuth.js configuration
 *
 * @see https://next-auth.js.org/configuration/callbacks
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    /**
     * Sign in callback to create a new author document in Sanity CMS
     * if the user doesn't exist yet.
     *
     * @param {object} user User object from NextAuth
     * @param {object} account Account object from NextAuth
     * @param {object} profile Profile object from NextAuth
     * @returns {boolean} Always returns true
     */
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(authorQuery, { id });
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id: id,
          name,
          username: login,
          email,
          image,
          bio: bio || '',
        });
      }
      return true;
    },

    /**
     * JWT callback to modify the token with user information.
     *
     * If an account and profile are provided, it fetches the user
     * from Sanity CMS using the profile's id and assigns the user's
     * Sanity _id to the token.
     *
     * @param {object} token JWT token object from NextAuth
     * @param {object} account Account object from NextAuth
     * @param {object} profile Profile object from NextAuth
     * @returns {object} Modified token with user id added
     */
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(authorQuery, { id: profile?.id });
        token.id = user?._id;
      }
      return token;
    },

    /**
     * Session callback to add user id to the session.
     *
     * @param {object} session Session object from NextAuth
     * @param {object} token JWT token object from NextAuth
     * @returns {object} Modified session with user id added
     */
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
