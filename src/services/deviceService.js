import db from "../models/index";

const checkDeviceExist = (deviceKeyCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let device = await db.Devices.findOne({
        where: { keyCode: deviceKeyCode },
      });
      if (device) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDevices = (deviceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let devices = "";
      if (deviceId.toLowerCase() === "all") {
        devices = await db.Devices.findAll({
          attributes: { exclude: ["tokenAuth", "tokenCollectData"] },
        });
      }
      if (deviceId && deviceId.toLowerCase() !== "all") {
        devices = await db.Devices.findOne({
          where: { id: deviceId },
          attributes: { exclude: ["tokenAuth", "tokenCollectData"] },
        });
      }

      resolve(devices);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDevicesByUser = (deviceId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let devices = "";
      if (deviceId.toLowerCase() === "all") {
        devices = await db.Devices.findAll({
          where: { userId: userId },
          attributes: { exclude: ["tokenAuth", "tokenCollectData"] },
        });
      }
      if (deviceId && deviceId.toLowerCase() !== "all") {
        devices = await db.Devices.findOne({
          where: { id: deviceId },
          attributes: { exclude: ["tokenAuth", "tokenCollectData"] },
        });
      }

      resolve(devices);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewDevice = (deviceData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist
      let checkDevice = await checkDeviceExist(deviceData.keyCode);
      if (checkDevice) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used",
        });
      } else {
        await db.Devices.create({
          keyCode: deviceData.name,
          name: deviceData.name,
          statusId: deviceData.statusId,
          userId: deviceData.userId,
          tokenAuth: deviceData.tokenAuth,
          tokenCollectData: deviceData.tokenCollectData,
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

const deleteDevice = (deviceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let device = await db.Devices.findOne({
        where: { id: deviceId },
      });

      if (!device) {
        resolve({
          errCode: 2,
          errMessage: `Device's not found`,
        });
      } else {
        await db.Devices.destroy({
          where: { id: deviceId },
        });
        resolve({
          errCode: 0,
          errMessage: "The device is deleted successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateDeviceData = (newDeviceData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!newDeviceData.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      const deviceData = await db.Devices.findOne({
        where: { id: newDeviceData.id },
        raw: false,
      });
      if (deviceData) {
        deviceData.name = newDeviceData.name;
        deviceData.status = newDeviceData.status;

        await deviceData.save();

        resolve({
          errCode: 0,
          errMessage: "Updated device successfully",
        });
      } else {
        resolve({ errCode: 1, errMessage: `Device's not found` });
      }
      await db.Devices.update({});
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllDevices,
  getAllDevicesByUser,
  createNewDevice,
  updateDeviceData,
  deleteDevice,
};
