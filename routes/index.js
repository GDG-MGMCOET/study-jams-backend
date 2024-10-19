const express = require("express");
const router = express.Router();

const auth = require("../middleware/Authentication");
const { updateParticipantsStatus } = require("../controller/admin");
const getparticipants = require("../controller/participants");

router.get("/", (req, res) => {
  return res.send({
    message: "Welcome to study-jams backend",
  });
});

router.get("/participants", getparticipants);
router.post(
  "/admin/update-participants-status",
  auth,
  updateParticipantsStatus
);

module.exports = router;
