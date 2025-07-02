const { InternalMemo, DocumentInternalMemo } = require("../models");
const { Op } = require("sequelize");
const cloudinary = require("../config/cloudinary");

class InternalMemoControllers {
  static async getAllInternalMemo(req, res) {
    try {
      const internalMemo = await InternalMemo.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: DocumentInternalMemo,
            attributes: ["name", "url"],
          },
        ],
      });
      res.status(200).json(internalMemo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createInternalMemo(req, res) {
    try {
      const { title, documentName } = req.body;
      const { id } = req.user;

      if (!req.file) {
        return res.status(400).json({ message: "PDF document is required" });
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "internal-memo-files",
        resource_type: "raw", // optional: jika ingin batasi ke pdf
      });

      await InternalMemo.create({ title, userId: id });

      await DocumentInternalMemo.create({
        sopLibraryId: sop.id,
        name: documentName || req.file.originalname,
        url: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
      });

      res.status(201).json({ message: "Internal memo created successfully" });
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateInternalMemo(req, res) {
    try {
      const { id } = req.params;
      const { title, documentName } = req.body;

      const internalMemo = await InternalMemo.findByPk(id, {
        include: [{ model: DocumentInternalMemo }],
      });

      await internalMemo.update({ title });

      if (req.file) {
        // Hapus dokumen lama
        for (const doc of internalMemo.Documents) {
          if (doc.cloudinaryId) {
            await cloudinary.uploader.destroy(doc.cloudinaryId);
          }
        }
        await DocumentInternalMemo.destroy({ where: { internalMemoId: id } });

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "internal-memo-files",
          resource_type: "raw",
        });

        await DocumentInternalMemo.create({
          sopLibraryId: sop.id,
          name: documentName || req.file.originalname,
          url: uploadResult.secure_url,
          cloudinaryId: uploadResult.public_id,
        });
      } else if (documentName) {
        // Rename dokumen
        const existingDoc = await Document.findOne({
          where: { internalMemoId: id },
        });
        if (existingDoc) {
          await existingDoc.update({ name: documentName });
        }
      }
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteInternalMemo(req, res) {
    try {
      const { id } = req.params;

      const internalMemo = await InternalMemo.findByPk(id, {
        include: [DocumentInternalMemo],
      });

      if (!internalMemo)
        return res.status(404).json({ message: "SOP not found" });
      if (req.user.role !== "admin" && req.user.id !== internalMemo.userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this SOP" });
      }

      // Hapus dari Cloudinary
      for (const doc of internalMemo.Documents) {
        if (doc.cloudinaryId) {
          await cloudinary.uploader.destroy(doc.cloudinaryId);
        }
      }

      // Hapus dari database
      await DocumentInternalMemo.destroy({ where: { internalMemoId: id } });
      await internalMemo.destroy();

      res.status(200).json({ message: "SOP deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = InternalMemoControllers;
