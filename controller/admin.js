const asyncMap = require("../utils/asyncMap");
const _ = require("lodash");
const mongoose = require("mongoose");

const updateParticipantsStatus = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { userInfoArr } = req.body;

    if (_.isNil(userInfoArr) || !Array.isArray(userInfoArr)) {
      await session.abortTransaction();
      return res.send({
        success: false,
        status: 400,
        message: "Invalid input",
        data: {},
      });
    }

    await asyncMap(userInfoArr, async (userInfo) => {
      const {
        name,
        email,
        accessCodeRedeemed,
        allBadgesCompleted,
        noOfBadges,
        arcadeGame,
      } = userInfo;

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

      //upsert in db
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
