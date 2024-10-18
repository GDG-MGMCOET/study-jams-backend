const express = require("express");
const router = express.Router();

const auth = require("../middleware/Authentication");
const { updateParticipantsStatus } = require("../controller/admin");

router.get("/", (req, res) => {
  return res.send({
    message: "Welcome to study-jams backend",
  });
});

router.post(
  "/admin/update-participants-status",
  auth,
  updateParticipantsStatus
);

module.exports = router;
