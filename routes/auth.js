/**
 * path: api/login
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, login, renewToken } = require("../controllers/auth");
const { validateField } = require("../middlewares/validar-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Named needed").not().isEmpty(),
    check("email", "Email needed").isEmail(),
    check("password", "Password needed").not().isEmpty(),
    validateField,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email needed").isEmail(),
    check("password", "Password needed").not().isEmpty(),
    validateField,
  ],
  login
);

// Validate Token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
