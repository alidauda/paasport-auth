import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/login', (req, res) => {
  if (req.user) {
    res.send('hello');
  }
  res.send('hi no user');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {}),
  (req, res) => {
    res.redirect('http://localhost:5173');
  }
);

export default router;
