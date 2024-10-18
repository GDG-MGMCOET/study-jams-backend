const { asyncMap } = require("../utils/asyncMap");
const _ = require("lodash");
const mongoose = require("mongoose");
const Participants = require("../model/participants");

const updateParticipantsStatus = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { participantsInfoArr } = req.body;

    if (_.isNil(participantsInfoArr) || !Array.isArray(participantsInfoArr)) {
      await session.abortTransaction();
      return res.send({
        success: false,
        status: 400,
        message: "Invalid input",
        data: {},
      });
    }

    await asyncMap(participantsInfoArr, async (participantInfo) => {
      const {
        name,
        email,
        accessCodeRedeemed,
        allBadgesCompleted,
        noOfBadges,
        arcadeGame,
      } = participantInfo;

      if (
        _.isNil(name) ||
        _.isNil(email) ||
        _.isNil(accessCodeRedeemed) ||
        _.isNil(allBadgesCompleted) ||
        _.isNil(noOfBadges) ||
        _.isNil(arcadeGame)
      ) {
        throw new Error("Mandatory fields missing");
      }

      await Participants.updateOne(
        { email },
        {
          $set: {
            name,
            accessCodeRedeemed,
            allBadgesCompleted,
            noOfBadges,
            arcadeGame,
          },
        },
        { upsert: true, session }
      );
    });

    await session.commitTransaction();
    return res.send({
      success: true,
      status: 200,
      message: "Participants progress updated successfully",
      data: {},
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return res.send({
      success: false,
      status: 500,
      message: "Error updating participants progress",
      data: {},
    });
  } finally {
    session.endSession();
  }
};

module.exports = { updateParticipantsStatus };
