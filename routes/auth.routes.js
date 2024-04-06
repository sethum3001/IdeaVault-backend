const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const JWT = require('jsonwebtoken');
const { verifyAccessToken } = require('../middleware/jwt_authentication');

// POST /verify-token route to verify the access token
router.post('/verify-token', verifyAccessToken, (req, res, next) => {

  res.json({ valid: true });
});

module.exports = router;

