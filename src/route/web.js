import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRouters = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/all", homeController.getAllData);

  router.post("/create-new-data", homeController.postNewData);

  return app.use("/", router);
};

module.exports = initWebRouters;
