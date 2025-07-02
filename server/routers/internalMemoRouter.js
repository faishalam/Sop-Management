const express = require("express");
const InternalMemoController = require("../controllers/internalMemoControllers");
const authentication = require("../middlewares/authentication");
const internalMemoRouter = express.Router();

internalMemoRouter.get(
  "/internalmemo",
  authentication,
  InternalMemoController.getAllInternalMemo
);
internalMemoRouter.post(
  "/internalmemo",
  authentication,
  InternalMemoController.createInternalMemo
);
internalMemoRouter.put(
  "/internalmemo/:id",
  authentication,
  InternalMemoController.updateInternalMemo
);
internalMemoRouter.delete(
  "/internalmemo/:id",
  authentication,
  InternalMemoController.deleteInternalMemo
);

module.exports = internalMemoRouter;
