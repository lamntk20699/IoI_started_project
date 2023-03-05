import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import deviceController from "../controllers/deviceController";
import roleController from "../controllers/roleController";
import sensorController from "../controllers/sensorController";
import sensorDataController from "../controllers/sensorDataController";

const router = express.Router();

const initWebRouters = (app) => {
  // test server
  router.get("/", homeController.getHomePage);
  router.get("/users", homeController.getUsersCRUD);
  router.post("/users/post-crud", homeController.postUsersCRUD);
  router.get("/users/get-crud", homeController.displayGetUsersCRUD);
  router.get("/users/edit-crud", homeController.getEditCRUD);
  router.post("/users/put-crud", homeController.putCRUD);
  router.get("/users/delete-crud", homeController.deleteCRUD);

  // Users APIs
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  // Devices APIs
  router.get("/api/get-all-devices", deviceController.handleGetAllDevices);
  router.post(
    "/api/create-new-devices",
    deviceController.handleCreateNewDevice
  );
  router.put("/api/edit-devices", deviceController.handleEditDevice);
  router.delete("/api/delete-devices", deviceController.handleDeleteDevice);

  // Roles APIs
  router.get("/api/get-all-roles", roleController.handleGetAllRoles);
  router.post("/api/create-new-roles", roleController.handleCreateNewRole);
  router.put("/api/edit-roles", roleController.handleEditRole);
  router.delete("/api/delete-roles", roleController.handleDeleteRole);

  // Sensors APIs
  router.get("/api/get-all-sensors", sensorController.handleGetAllSensors);
  router.post(
    "/api/create-new-sensors",
    sensorController.handleCreateNewSensor
  );
  router.put("/api/edit-sensors", sensorController.handleEditSensor);
  router.delete("/api/delete-sensors", sensorController.handleDeleteSensor);

  // SensorData APIs
  router.get(
    "/api/get-all-sensorData",
    sensorDataController.handleGetAllSensorData
  );
  router.post(
    "/api/create-new-sensorData",
    sensorDataController.handleCreateNewSensorData
  );

  return app.use("/", router);
};

module.exports = initWebRouters;
