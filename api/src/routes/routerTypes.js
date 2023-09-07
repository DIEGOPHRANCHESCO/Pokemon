const { Router } = require("express");
const { getTypesHandler } = require("../Handlers/handlerTypes");

const types = Router();

types.get("/", getTypesHandler);

module.exports = types;
