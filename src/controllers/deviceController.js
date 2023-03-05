import deviceService from "../services/deviceService";

const handleGetAllDevices = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      devices: [],
    });
  }

  const devices = await deviceService.getAllDevices(id);
  console.log(devices);

  return res.status(200).json({
    ...devices,
  });
};

const handleCreateNewDevice = async (req, res) => {
  const deviceData = req.body;
  const message = await deviceService.createNewDevice(deviceData);
  return res.status(200).json(message);
};

const handleEditDevice = async (req, res) => {
  const data = req.body;
  let message = await deviceService.updateDeviceData(data);
  return res.status(200).json(message);
};

const handleDeleteDevice = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }

  const message = await deviceService.deleteDevice(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllDevices,
  handleCreateNewDevice,
  handleEditDevice,
  handleDeleteDevice,
};
