import db from "../models/index";
import bcrypt from "bcryptjs";

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

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        // User already exists
        const user = await db.Users.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });

        if (user) {
          // compare the password
          let checkPassword = await bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = "Ok";

            delete user.password;
            userData.user = user ? user : {};
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = "Your email is not exist!";
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId.toLowerCase() === "all") {
        users = await db.Users.findAll({
          attributes: { exclude: ["password"] },
        });
      }
      if (userId && userId.toLowerCase() !== "all") {
        users = await db.Users.findOne({
          where: { id: userId },
          attributes: { exclude: ["password"] },
        });
      }

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist
      let checkEmail = await checkUserEmail(userData.email);
      if (checkEmail) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used",
        });
      } else {
        const hashPasswordFromBcrypt = await hashUserPassword(
          userData.password
        );
        await db.Users.create({
          username: userData.username,
          password: hashPasswordFromBcrypt,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          gender: userData.gender === "1" ? true : false,
          roleId: userData.roleId,
        });

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: userId },
      });

      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `User's not found`,
        });
      } else {
        await db.Users.destroy({
          where: { id: userId },
        });
        resolve({
          errCode: 0,
          errMessage: "The user is deleted successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (newUserData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!newUserData.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      const userData = await db.Users.findOne({
        where: { id: newUserData.id },
        raw: false,
      });
      if (userData) {
        userData.firstName = newUserData.firstName;
        userData.lastName = newUserData.lastName;
        userData.username = newUserData.username;
        userData.phoneNumber = newUserData.phoneNumber;
        userData.address = newUserData.address;

        await userData.save();

        resolve({
          errCode: 0,
          errMessage: "Updated user successfully",
        });
      } else {
        resolve({ errCode: 1, errMessage: `User's not found` });
      }
      await db.Users.update({});
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
