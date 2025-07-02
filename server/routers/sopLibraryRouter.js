const express = require("express");
const SopLibraryControllers = require("../controllers/sopLibraryControllers");
const authentication = require("../middlewares/authentication");
const sopLibraryRouter = express.Router();

sopLibraryRouter.post(
  "/soplibrary",
  authentication,
  upload.single("document"),
  SopLibraryControllers.createSopLibrary
);
sopLibraryRouter.get(
  "/soplibrary",
  authentication,
  SopLibraryControllers.getCategoriesWithSop
);
sopLibraryRouter.put(
  "/soplibrary/:id",
  authentication,
  upload.single("document"),
  SopLibraryControllers.updateSopLibrary
);
sopLibraryRouter.delete(
  "/soplibrary/:id",
  authentication,
  SopLibraryControllers.deleteSopLibrary
);
sopLibraryRouter.get(
  "/soplibrary/:id",
  authentication,
  SopLibraryControllers.getSopById
);
sopLibraryRouter.put(
  "/soplibrary/:id/approve",
  authentication,
  SopLibraryControllers.approvalSopLibrary
);
sopLibraryRouter.post(
  "/sopLibrary/category",
  authentication,
  SopLibraryControllers.createCategory
);
sopLibraryRouter.delete(
  "/sopLibrary/category",
  authentication,
  SopLibraryControllers.deleteCategory
);
sopLibraryRouter.delete(
  "/sopLibrary/category/:id",
  authentication,
  SopLibraryControllers.getAllCategory
);

module.exports = sopLibraryRouter;
