import db from "../models/index";

const getAllSensorDataBySensor = (sensorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sensorData = await db.SensorData.findAll({
        where: { sensorId: sensorId },
      });

      resolve(sensorData);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewSensorData = (sensorData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist

      await db.SensorData.create({
        temperature: sensorData.temperature,
        pH: sensorData.pH,
        acidity: sensorData.acidity,
        chlorine: sensorData.chlorine,
        oxygen: sensorData.oxygen,
        sensorId: sensorData.sensorId,
      });

      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllSensorDataBySensor,
  createNewSensorData,
};
