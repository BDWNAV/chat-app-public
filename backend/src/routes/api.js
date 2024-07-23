const router = require("express").Router();
const authCheck = require("../middleware/authCheck");

router.use("/auth", require("./oauth/auth"));
router.use("/conversations", authCheck, require("./conversations/conversations"));

module.exports = router;