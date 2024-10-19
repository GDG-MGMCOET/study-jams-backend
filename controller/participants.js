const participantsModel = require("../model/participants");

const getparticipants = async (req, res) => {
  try {
    const participants = await participantsModel.find();

    if (participants.length === 0) {
      return res.send({
        success: true,
        status: 200,
        message: "No participants found",
        data: [],
      });
    }

    return res.send({
      success: true,
      status: 200,
      message: "Participants retrieved successfully",
      data: participants,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      status: 500,
      message: "Error retrieving participants",
      data: {},
    });
  }
};

module.exports = getparticipants;
