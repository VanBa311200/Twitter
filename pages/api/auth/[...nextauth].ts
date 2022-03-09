import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import dbConnect from '../../../utils/connectDB';
import UserSchema from '../../../models/User';
import { UserInterFace } from '../../../types/auth';
import { signOut } from 'next-auth/react';

dbConnect();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: 'nicenicenice',
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: { maxAge: 24 * 60 * 60 },
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        // console.log({ user, account });
        await UserSchema.findOne({ uid: user.id })
          .then((result) => {
            if (result === null) {
              const obj = {
                email: user.email,
                fullName: user.name,
                photoURL: user?.image,
                providerId: account.provider,
                tag: '@' + user.name?.split(' ').join(''),
                uid: user.id,
              };

              try {
                new UserSchema(obj).save();
              } catch (error) {
                console.error({ Signin: error });
                return '/auth/error?error=AccessDenied';
              }
            }
          })
          .catch((error) => {
            console.error(error);
            return '/auth/error?error=AccessDenied';
          });
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.uid = account.providerAccountId;
      }
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      await UserSchema.findOne({ uid: token.uid })
        .then((value: UserInterFace) => {
          if (value !== null) {
            session._id = value._id;
            session.tag = value.tag;
          } else {
            signOut({ redirect: false, callbackUrl: '/login' });
          }
        })
        .catch((error) => console.error({ JWTconfig: error }));
      session.accessToken = token.accessToken;
      session.uid = token.uid;

      // console.log({ session });

      return Promise.resolve(session);
    },
  },
});
