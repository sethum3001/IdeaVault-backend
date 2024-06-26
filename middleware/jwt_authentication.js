const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

module.exports = {
  signAccessToken: (userId,name) => {
    return new Promise((resolve, reject) => {
      const payload = {
        name: name,
        userId: userId,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "yourdomain.com",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }

      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId,name) => {
    return new Promise((resolve, reject) => {
      const payload = {
        name: name,
        userId: userId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "yourdomain.com",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (req,refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized());
        }

        req.payload = payload;
        resolve(payload);
      });
    });
  },
};

