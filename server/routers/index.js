const express = require("express");
const userRouter = require("./userRouter");
const sopLibraryRouter = require("./sopLibraryRouter");
const internalMemoRouter = require("./internalMemoRouter");
const businessProcessRouter = require("./businessProcessRouter");

const router = express.Router();

router.use("/", userRouter);
router.use("/", sopLibraryRouter);
router.use("/", internalMemoRouter);
router.use("/", businessProcessRouter);

module.exports = router;
