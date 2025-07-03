const {
  BusinessProcess,
  Category,
  SopLibrary,
  Document,
} = require("../models");

class BusinessProcessController {
  static async getAllBusinessProcess(req, res) {
    try {
      const businessProcess = await BusinessProcess.findAll();
      res.status(200).json(businessProcess);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getBusinessProcessById(req, res) {
    try {
      const { id } = req.params;

      const responses = await BusinessProcess.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: [
              {
                model: SopLibrary,
                attributes: ["title"],
                where: { status: "approved by superior 2" },
                include: [
                  {
                    model: Document,
                    attributes: ["name", "url"],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!responses) {
        return res.status(404).json({ message: "Business Process not found" });
      }

      res.status(200).json(responses);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createBusinessProcess(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.user;

      const response = await BusinessProcess.create({ name, userId: id });
      res.status(200).json(response);
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

  static async updateBusinessProcess(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      await BusinessProcess.update({ name }, { where: { id } });
      res
        .status(200)
        .json({ message: "Business Process updated successfully" });
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

  static async deleteBusinessProcess(req, res) {
    try {
      const { id } = req.params;
      await BusinessProcess.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: "Business Process deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = BusinessProcessController;
