const router = require("express").Router();
const passport = require("passport");
const google = require("../../strategies/googleStrategy");
const authCheck = require("../../middleware/authCheck");
const { url } = require("../../app");

router.get("/google", passport.authenticate("google"));

router.get("/google/redirect", passport.authenticate("google", {
  successRedirect: url,
  failureRedirect: "/api/auth/google"
}));

router.get("/google/info", authCheck, (req, res) => {
  res.send(req.user);
});

module.exports = router; 