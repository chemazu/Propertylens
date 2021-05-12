const { Router } = require("express");
const { uploadListing } = require("../helpers/listing");
const { registerHandler, loginHandler } = require("../helpers/user");

const router = Router();

router.get("/", () => {
  console.log("running on 5000");
});
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/submitProperty", uploadListing);

module.exports = router;
