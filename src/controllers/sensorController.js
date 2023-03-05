import sensorService from "../services/sensorService";

const handleGetAllSensors = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      sensors: [],
    });
  }

  const sensors = await sensorService.getAllSensors(id);
  console.log(sensors);

  return res.status(200).json({
    ...sensors,
  });
};

const handleCreateNewSensor = async (req, res) => {
  const sensorData = req.body;
  const message = await sensorService.createNewSensor(sensorData);
  return res.status(200).json(message);
};

const handleEditSensor = async (req, res) => {
  const data = req.body;
  let message = await sensorService.updateSensorData(data);
  return res.status(200).json(message);
};

const handleDeleteSensor = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }

  const message = await sensorService.deleteSensor(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllSensors,
  handleCreateNewSensor,
  handleEditSensor,
  handleDeleteSensor,
};
