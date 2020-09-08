const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ ok: false, msg: "Email already exist!" });
    }
    const user = new User(req.body);
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    console.log("=> ", user.id);
    // Generate JWT
    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      msg: user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact admin",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(400).json({ ok: false, msg: "Email not found" });
    }

    // Validate pwd
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Invalid password" });
    }

    // Generate JWT
    const token = await generateJWT(userDB.uid);
    res.json({
      ok: true,
      msg: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact admin",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  const token = await generateJWT(uid);

  const user = await User.findById(uid);

  res.json({
    ok: true,
    msg: user,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
