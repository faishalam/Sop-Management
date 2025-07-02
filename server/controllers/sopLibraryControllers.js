const { SopLibrary, Category, User, Document, Revised } = require("../models");
const { Op } = require("sequelize");
const cloudinary = require("../config/cloudinary");

class SopLibraryController {
  static async createSopLibrary(req, res) {
    try {
      const { id: userId } = req.user;
      const {
        categoryId,
        businessProcess,
        title,
        effectiveDate,
        superior_1,
        superior_2,
        md,
        documentName,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "PDF document is required" });
      }

      // Upload ke Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "sop-files",
        resource_type: "raw", // optional: jika ingin batasi ke pdf
      });

      // Simpan ke SOP Library
      const sop = await SopLibrary.create({
        userId,
        categoryId,
        businessProcess,
        title,
        effectiveDate,
        superior_1,
        superior_2,
        md,
      });

      // Simpan dokumen ke tabel Document
      await Document.create({
        sopLibraryId: sop.id,
        name: documentName || req.file.originalname,
        url: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
      });

      res.status(201).json({ message: "SOP created successfully", sop });
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

  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.user;

      await Category.create({ name, userId: id });
      res.status(201).json({ message: "Category created successfully" });
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

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await Category.destroy({ where: { id } });
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllCategory(req, res) {
    try {
      const findAll = await Category.findAll();
      res.status(200).json(findAll);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getCategoriesWithSop(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: SopLibrary,
            where: {
              businessProcess: {
                [Op.ne]: null,
              },
            },
            required: true,
            include: [
              {
                model: User,
                attributes: ["username", "email"],
              },
              {
                model: Document,
                attributes: ["name", "url"],
              },
              {
                model: Revised,
                attributes: ["reasonRevise", "revisedBy"],
              },
            ],
          },
        ],
        order: [["name", "ASC"]],
      });

      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateSopLibrary(req, res) {
    try {
      const { id } = req.params;

      const sop = await SopLibrary.findByPk(id, {
        include: [{ model: Document }],
      });

      if (!sop) return res.status(404).json({ message: "SOP not found" });

      const {
        categoryId,
        title,
        businessProcess,
        effectiveDate,
        superior_1,
        superior_2,
        md,
        documentName,
      } = req.body;

      // Update data SOP
      await sop.update({
        categoryId,
        title,
        businessProcess,
        effectiveDate,
        superior_1,
        superior_2,
        md,
      });

      // Handle file update
      if (req.file) {
        // Hapus dokumen lama
        for (const doc of sop.Documents) {
          if (doc.cloudinaryId) {
            await cloudinary.uploader.destroy(doc.cloudinaryId);
          }
        }
        await Document.destroy({ where: { sopLibraryId: id } });

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "sop-files",
          resource_type: "raw",
        });

        await Document.create({
          sopLibraryId: sop.id,
          name: documentName || req.file.originalname,
          url: uploadResult.secure_url,
          cloudinaryId: uploadResult.public_id,
        });
      } else if (documentName) {
        // Rename dokumen
        const existingDoc = await Document.findOne({
          where: { sopLibraryId: id },
        });
        if (existingDoc) {
          await existingDoc.update({ name: documentName });
        }
      }

      res.status(200).json({ message: "SOP updated successfully", sop });
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

  static async deleteSopLibrary(req, res) {
    try {
      const { id } = req.params;

      const sop = await SopLibrary.findByPk(id, {
        include: [Document],
      });

      if (!sop) return res.status(404).json({ message: "SOP not found" });
      if (req.user.role !== "admin" && req.user.id !== sop.userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this SOP" });
      }

      // Hapus dari Cloudinary
      for (const doc of sop.Documents) {
        if (doc.cloudinaryId) {
          await cloudinary.uploader.destroy(doc.cloudinaryId);
        }
      }

      // Hapus dari database
      await Document.destroy({ where: { sopLibraryId: id } });
      await sop.destroy();

      res.status(200).json({ message: "SOP deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getSopById(req, res) {
    try {
      const { id } = req.params;

      const sop = await SopLibrary.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Document,
            attributes: ["id", "name", "url"],
          },
          {
            model: Revised,
            attributes: ["reasonRevise", "revisedBy"],
          },
        ],
      });

      if (!sop) {
        return res.status(404).json({ message: "SOP not found" });
      }

      res.status(200).json(sop);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async approvalSopLibrary(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.user;
      const { reasonRevise } = req.body;

      const sop = await SopLibrary.findByPk(id);
      if (!sop) return res.status(404).json({ message: "SOP not found" });

      if (reasonRevise) {
        await Revised.create({
          sopLibraryId: id,
          reasonRevise: reasonRevise,
          revisedBy: role,
        });
        await sop.update({ status: "revised" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      if (role === "superior_1" && sop.status === "revised") {
        await Revised.destroy({ where: { sopLibraryId: id } });
        await sop.update({ status: "approved by superior 1" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      if (role === "superior_1" && sop.status === "submitted") {
        await sop.update({ status: "approved by superior 1" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      if (role === "MR Mutu" && sop.status === "approved by superior 1") {
        await sop.update({ status: "approved by MR Mutu" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      if (role === "MR K3KOLH" && sop.status === "approved by MR Mutu") {
        await sop.update({ status: "approved by MR K3KOLH" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      if (role === "superior_2" && sop.status === "approved by MR K3KOLH") {
        await sop.update({ status: "approved by superior 2" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      if (role === "admin" && sop.status === "approved by superior 2") {
        await sop.update({ status: "approved" });
        res.status(200).json({ message: "SOP approved successfully" });
        return;
      }

      await sop.update({ status: "approved" });
      res.status(200).json({ message: "SOP approved successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SopLibraryController;
