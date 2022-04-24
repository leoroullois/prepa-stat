import nc from "next-connect";
import { ObjectId } from "mongodb";
import passport from "passport";
import { connectDB } from "@lib/db";
import { User } from "@models/User";
import { Favorite } from "@models/Favorite";
const GitHubStrategy = require("passport-github").Strategy;
// Saves user's ID to a session
passport.serializeUser((user, done) => {
   done(null, user);
});
// Retrieve user's ID from a session
passport.deserializeUser((id: string, done) => {
   User.findOne({ _id: new ObjectId(id) }, (err: any, user: any) => {
      if (err) {
         return done(err);
      }
      done(null, user);
   });
});

passport.use(
   new GitHubStrategy(
      {
         clientID: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
         callbackURL: `${process.env.HOST}/api/auth/callback/github`,
      },
      function (accessToken: any, refreshToken: any, profile: any, cb: any) {
         console.log("Profile :", profile);
         const id = new ObjectId();
         User.findOneAndUpdate(
            { githubId: profile.id },
            {
               $setOnInsert: {
                  id: id,
                  githubId: profile.id,
                  name: profile.displayName || "John Doe",
                  photo: profile.photos[0].value || "",
                  email: Array.isArray(profile.emails)
                     ? profile.emails[0].value
                     : "No public email",
                  created_on: new Date(),
                  provider: profile.provider || "",
               },
               $set: {
                  last_login: new Date(),
               },
               $inc: {
                  login_count: 1,
               },
            },
            { upsert: true, new: true },
            (err, user: any) => {
               if (err) {
                  throw err;
               }
               Favorite.findOneAndUpdate(
                  { _id: id },
                  { $setOnInsert: { _id: new ObjectId(id), favorites: [] } },
                  { upsert: true, new: true },
                  (err: any, user: any) => {
                     if (err) {
                        throw err;
                     }
                     return cb(err, user);
                  }
               );
            }
         );
      }
   )
);

const handler = nc().get(
   passport.authenticate("github", {
      failureRedirect: "/se-connecter",
   })
);

export default connectDB(handler);

