import connection from "../config/connectDB";
import CRUDService from "../services/CRUDService";

const getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

const getAboutPage = (req, res) => {
  return res.render("sensors/sensorInfo.ejs");
};

const getAllData = (req, res) => {
  let data = [];

  connection.query(
    "SELECT * FROM `sensordata`",
    function (err, results, fields) {
      console.log(">>> check mysql:");
      console.log(results); // results contains rows returned by server
      results.map((item) => {
        data.push({
          id: item.id,
          packet_no: item.packet_no,
          temparature: item.temparature,
          humidity: item.humidity,
          tds: item.tds,
          pH: item.pH,
        });
      });

      // console.log(">>> Results:", JSON.stringify(data));
      return res.render("sensors/sensorInfo.ejs", {
        dataFetched: data,
      });
    }
  );
};

const postNewData = async (req, res) => {
  let message = await CRUDService.addNewData(req.body);
  console.log(message);
  return res.send("post new data");
};

module.exports = {
  getHomePage,
  getAboutPage,
  getAllData,
  postNewData,
};
