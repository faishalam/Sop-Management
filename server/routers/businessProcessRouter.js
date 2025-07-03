const express = require("express");
const authentication = require("../middlewares/authentication.js");
const BusinessProcessController = require("../controllers/businessProcessControllers.js");
const businessProcessRouter = express.Router();

businessProcessRouter.use(authentication);
businessProcessRouter.get("/business-process", BusinessProcessController.getAllBusinessProcess);


module.exports = businessProcessRouter;
