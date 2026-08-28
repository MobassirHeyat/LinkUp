const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 7000,
  JWT_SECRET: process.env.JWT_SECRET || "linkup-dev-secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
