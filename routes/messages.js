/**
 * path: api/messages
 */

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getChat } = require("../controllers/messages");
const router = Router();

// List all
router.get("/:from", validateJWT, getChat);

module.exports = router;
