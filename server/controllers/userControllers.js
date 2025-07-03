const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async createUser(req, res) {
    try {
      const { nrp, password } = req.body;
      const username = req.body.username?.trim().toLowerCase();
      const email = req.body.email?.trim().toLowerCase();

      // 1. validate unique email
      const validateEmail = await User.findOne({ where: { email } });
      if (validateEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      //2. validate unique nrp
      const validateNrp = await User.findOne({ where: { nrp } });
      if (validateNrp) {
        return res.status(400).json({ message: "NRP already exists" });
      }

      // 3. validate length of password
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      // 4. create account
      const newUser = await User.create({
        username,
        nrp,
        email,
        password,
      });

      // 5. response without password
      const responseWithoutPassword = {
        id: newUser.id,
        nrp: newUser.nrp,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      };

      res.status(201).json(responseWithoutPassword);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllUser(req, res) {
    try {
      const findAll = await User.findAll();
      res.status(200).json(findAll);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { nrp, password } = req.body;
      // 1. validasi form
      if (!nrp)
        return res.status(400).json({ message: "Please enter your email" });
      if (!password)
        return res.status(400).json({ message: "Please enter your password" });

      // 2. cari user
      let findUser = await User.findOne({ where: { nrp } });
      if (!findUser)
        return res.status(401).json({ message: "Invalid nrp/password" });

      // 3. verify password
      let checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword)
        return res.status(401).json({ message: "Invalid nrp/password" });

      let access_token = signToken({
        id: findUser.id,
        username: findUser.username,
        nrp: findUser.nrp,
        email: findUser.email,
        role: findUser.role,
      });

      res.status(200).json({
        data: {
          access_token: access_token,
          nrp: findUser.nrp,
          role: findUser.role,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.body.id;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { nrp, email, OldPassword, newPassword, role } = req.body;
      const updates = { nrp, role };

      if (email && email !== user.email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Email already registered" });
        }
        updates.email = email;
      }

      if (OldPassword || newPassword) {
        if (!OldPassword || !newPassword) {
          return res
            .status(400)
            .json({ message: "Both old and new passwords are required" });
        }

        if (newPassword.length < 6) {
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
        }

        const isMatch = comparePassword(OldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid old password" });
        }

        updates.password = newPassword;
      }

      await user.update(updates);

      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getUserDetail(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await User.destroy({ where: { id } });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getLoggedInUser(req, res) {
    try {
      const { id, username, email, nrp, role } = req.user;
      res.status(200).json({ id, username, email, nrp, role });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
