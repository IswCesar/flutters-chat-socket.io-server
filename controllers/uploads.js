const { response } = require("express");

const uploadAudio = async(req, res = response) => {
    console.log(req.file)
    res.json(req.file)
};

const uploadVideo = async(req, res = response) => {
    console.log(req.file)
    res.json(req.file)
};

module.exports = {
    uploadAudio,
    uploadVideo
};