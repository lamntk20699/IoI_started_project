import sensorDataService from "../services/sensorDataService";

const handleGetAllSensorData = async (req, res) => {
  const sensorId = req.body.id;

  if (!sensorId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      sensorData: [],
    });
  }

  const sensorData = await sensorDataService.getAllSensorDataBySensor(sensorId);
  console.log(sensorData);

  return res.status(200).json({
    ...sensorData,
  });
};

const handleCreateNewSensorData = async (req, res) => {
  const sensorData = req.body;
  const message = await sensorDataService.createNewSensorData(sensorData);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllSensorData,
  handleCreateNewSensorData,
};
