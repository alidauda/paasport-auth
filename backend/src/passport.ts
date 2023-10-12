import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { db } from './utils/db';
import 'dotenv/config';
import { User as UserDocument } from '@prisma/client';

type UserWithoutPassword = Omit<UserDocument, 'password'>;
declare global {
  namespace Express {
    interface User extends UserWithoutPassword {}
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await db.user.findUnique({
          where: {
            email: profile.emails![0].value,
          },
        });

        if (!user) {
          const newUser = await db.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails![0].value,
              image_url: profile.profileUrl,
            },
          });

          if (newUser) {
            done(null, newUser);
          } else {
            done(new Error('Failed to create new user.'));
          }
        } else {
          done(null, user);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });
  done(null, user);
});
