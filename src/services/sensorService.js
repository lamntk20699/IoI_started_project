import db from "../models/index";

const checkSensorExist = (sensorKeyCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sensor = await db.Sensors.findOne({
        where: { keyCode: sensorKeyCode },
      });
      if (sensor) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSensors = (sensorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sensors = "";
      if (sensorId.toLowerCase() === "all") {
        sensors = await db.Sensors.findAll({});
      }
      if (sensorId && sensorId.toLowerCase() !== "all") {
        sensors = await db.Sensors.findOne({
          where: { id: sensorId },
        });
      }

      resolve(sensors);
    } catch (error) {
      reject(error);
    }
  });
};

const getSensorsIdByKeyCode = (sensorKeyCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sensorId = "ERROR";
      if (sensorKeyCode) {
        sensors = await db.Sensors.findOne({
          where: { keyCode: sensorKeyCode },
        });
      }

      resolve(sensorId);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSensorsByUser = (sensorId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sensors = "";
      if (sensorId.toLowerCase() === "all") {
        sensors = await db.Sensors.findAll({
          where: { userId: userId },
        });
      }
      if (sensorId && sensorId.toLowerCase() !== "all") {
        sensors = await db.Sensors.findOne({
          where: { id: sensorId },
        });
      }

      resolve(sensors);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewSensor = (sensorData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist
      let checkSensor = await checkSensorExist(sensorData.keyCode);
      if (checkSensor) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used",
        });
      } else {
        await db.Sensors.create({
          keyCode: sensorData.name,
          name: sensorData.name,
          statusId: sensorData.statusId,
          userId: sensorData.userId,
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

const deleteSensor = (sensorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sensor = await db.Sensors.findOne({
        where: { id: sensorId },
      });

      if (!sensor) {
        resolve({
          errCode: 2,
          errMessage: `Sensor's not found`,
        });
      } else {
        await db.Sensors.destroy({
          where: { id: sensorId },
        });
        resolve({
          errCode: 0,
          errMessage: "The sensor is deleted successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateSensorData = (newSensorData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!newSensorData.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      const sensorData = await db.Sensors.findOne({
        where: { id: newSensorData.id },
        raw: false,
      });
      if (sensorData) {
        sensorData.name = newSensorData.name;
        sensorData.status = newSensorData.status;

        await sensorData.save();

        resolve({
          errCode: 0,
          errMessage: "Updated sensor successfully",
        });
      } else {
        resolve({ errCode: 1, errMessage: `Sensor's not found` });
      }
      await db.Sensors.update({});
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllSensors,
  getAllSensorsByUser,
  getSensorsIdByKeyCode,
  createNewSensor,
  updateSensorData,
  deleteSensor,
};
