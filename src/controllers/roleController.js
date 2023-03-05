import roleService from "../services/roleService";

const handleGetAllRoles = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      roles: [],
    });
  }

  const roles = await roleService.getAllRoles(id);
  console.log(roles);

  return res.status(200).json({
    ...roles,
  });
};

const handleCreateNewRole = async (req, res) => {
  const roleData = req.body;
  const message = await roleService.createNewRole(roleData);
  return res.status(200).json(message);
};

const handleEditRole = async (req, res) => {
  const data = req.body;
  let message = await roleService.updateRoleData(data);
  return res.status(200).json(message);
};

const handleDeleteRole = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }

  const message = await roleService.deleteRole(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllRoles,
  handleCreateNewRole,
  handleEditRole,
  handleDeleteRole,
};
