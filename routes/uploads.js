/**
 * path: api/uploads
 */

const { Router } = require("express");
// const { validateJWT } = require("../middlewares/validate-jwt");
const { uploadAudio, uploadVideo } = require("../controllers/uploads");


// Config audio storage
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const uploadStorage = multer({ storage: storage })

const router = Router();

// List all
router.post("/audios", uploadStorage.single('file'), uploadAudio);
router.post("/videos", uploadStorage.single('file'), uploadVideo);

module.exports = router;