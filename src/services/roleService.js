import db from "../models/index";

const checkRoleExist = (rolekey) => {
  return new Promise(async (resolve, reject) => {
    try {
      let role = await db.Roles.findOne({
        where: { key: rolekey },
      });
      if (role) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllRoles = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let roles = "";
      if (roleId.toLowerCase() === "all") {
        roles = await db.Roles.findAll({});
      }
      if (roleId && roleId.toLowerCase() !== "all") {
        roles = await db.Roles.findOne({
          where: { id: roleId },
        });
      }

      resolve(roles);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewRole = (roleData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist
      let checkRole = await checkRoleExist(roleData.key);
      if (checkRole) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used",
        });
      } else {
        await db.Roles.create({
          key: roleData.key,
          type: roleData.type,
          value: roleData.value,
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

const deleteRole = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let role = await db.Roles.findOne({
        where: { id: roleId },
      });

      if (!role) {
        resolve({
          errCode: 2,
          errMessage: `Role's not found`,
        });
      } else {
        await db.Roles.destroy({
          where: { id: roleId },
        });
        resolve({
          errCode: 0,
          errMessage: "The role is deleted successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateRoleData = (newRoleData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!newRoleData.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      const roleData = await db.Roles.findOne({
        where: { id: newRoleData.id },
        raw: false,
      });
      if (roleData) {
        roleData.type = newRoleData.type;
        roleData.value = newRoleData.value;

        await roleData.save();

        resolve({
          errCode: 0,
          errMessage: "Updated role successfully",
        });
      } else {
        resolve({ errCode: 1, errMessage: `Role's not found` });
      }
      await db.Roles.update({});
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllRoles,
  createNewRole,
  updateRoleData,
  deleteRole,
};
