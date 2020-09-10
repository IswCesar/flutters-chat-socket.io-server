const Message = require("../models/message");
const { response } = require("express");

const getChat = async (req, res = response) => {
  const myId = req.uid;
  const messgesFrom = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: myId, to: messgesFrom },
      {
        from: messgesFrom,
        to: myId,
      },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: "",
    msg: last30,
  });
};

module.exports = {
  getChat,
};
