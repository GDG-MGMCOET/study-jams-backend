const participantsModel = require("../model/participants");

const getparticipants = async (req, res) => {
  try {
    const participants = await participantsModel.find().sort({
      accessCodeRedeemed: -1,
      noOfBadges: -1,
      arcadeGame: -1,
    });

    if (participants.length === 0) {
      return res.send({
        success: true,
        status: 200,
        message: "No participants found",
        data: {
          participants: [],
        },
      });
    }

    const maskedParticipants = participants.map((participant) => {
      const emailParts = participant.email.split("@");
      const maskedEmail = `${emailParts[0].substring(0, 2)}***@${
        emailParts[1]
      }`;

      return {
        ...participant._doc,
        email: maskedEmail,
      };
    });

    return res.send({
      success: true,
      status: 200,
      message: "Participants retrieved successfully",
      data: {
        participants: maskedParticipants,
        lastUpdated: participants[0].updatedAt,
      },
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
