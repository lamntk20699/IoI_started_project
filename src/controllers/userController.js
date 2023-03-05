import userService from "../services/userService";

const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }

  const userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    ...userData,
  });
};

const handleGetAllUsers = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      users: [],
    });
  }

  const users = await userService.getAllUsers(id);
  console.log(users);

  return res.status(200).json({
    ...users,
  });
};

const handleCreateNewUser = async (req, res) => {
  const userData = req.body;
  const message = await userService.createNewUser(userData);
  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  const data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }

  const message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
};
