const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../helpers/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sop-documents",
    resource_type: "auto",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage });

module.exports = upload;
