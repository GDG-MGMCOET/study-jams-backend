const mongoose = require("mongoose");

const ParticipantsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    accessCodeRedeemed: {
      type: Boolean,
      required: true,
      default: false,
    },
    allBadgesCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    noOfBadges: {
      type: Number,
      required: true,
      default: 0,
    },
    arcadeGame: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const participantsModel = mongoose.model("Participants", ParticipantsSchema);

module.exports = participantsModel;
