import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  }
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send("worked");
});

export default router;
