import connection from "../config/connectDB";
import CRUDService from "../services/CRUDService";
import db from "../models/index";
import { query } from "express";

const getHomePage = async (req, res) => {
  try {
    let data = await db.Users.findAll({
      raw: true,
    });
    // console.log(data);
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

// const getAllData = (req, res) => {
//   let data = [];

//   connection.query(
//     "SELECT * FROM `sensordata`",
//     function (err, results, fields) {
//       console.log(">>> check mysql:");
//       console.log(results); // results contains rows returned by server
//       results.map((item) => {
//         data.push({
//           id: item.id,
//           packet_no: item.packet_no,
//           temparature: item.temparature,
//           humidity: item.humidity,
//           tds: item.tds,
//           pH: item.pH,
//         });
//       });

//       // console.log(">>> Results:", JSON.stringify(data));
//       return res.render("sensors/sensorInfo.ejs", {
//         dataFetched: data,
//       });
//     }
//   );
// };

const getUsersCRUD = (req, res) => {
  return res.render("crud-users.ejs");
};

const postUsersCRUD = async (req, res) => {
  const message = await CRUDService.createNewUSer(req.body);
  console.log(message);
  return res.send("post users crud");
};

const displayGetUsersCRUD = async (req, res) => {
  const data = await CRUDService.getAllUsers();
  // console.log("------------------------");
  // console.log(data);
  // console.log("------------------------");
  return res.render("displayGetAllUser.ejs", { dataTable: data });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    // console.log("------------------------");
    // console.log(userData);
    // console.log("------------------------");
    return res.render("edit-users.ejs", {
      userInfo: userData,
      userId: userId,
    });
  } else {
    return res.send("user_not_found");
  }
};

const putCRUD = async (req, res) => {
  const data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayGetAllUser.ejs", { dataTable: allUsers });
};

const deleteCRUD = async (req, res) => {
  let id = req.query.id;
  console.log("id: ", id);
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("delete user successfully");
  } else {
    return res.send("user not found");
  }
};

module.exports = {
  getHomePage,
  getUsersCRUD,
  postUsersCRUD,
  displayGetUsersCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
