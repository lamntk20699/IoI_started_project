import bcrypt from "bcryptjs";
import e from "express";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const createNewUSer = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.Users.create({
        username: data.username,
        password: hashPasswordFromBcrypt,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });

      resolve(" Create new user success!");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.Users.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Users.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Users.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.username = data.username;
        user.address = data.address;

        await user.save();

        const allUsers = await db.Users.findAll({
          raw: true,
        });
        resolve(allUsers);
      } else {
        resolve();
      }
      await db.Users.update({});
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: userId },
      });

      if (user) {
        await user.destroy();
      } else {
        console.log("user not found");
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUSer,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
