// import db from "../models/index";

const addNewData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let temp = await {
        packet_no: data.packet_no,
        temparature: data.temparature,
        humidity: data.humidity,
        tds: data.tds,
        pH: data.pH,
      };

      resolve(temp);
    } catch (e) {
      reject(e);
    }
  });
  console.log(data);
};

module.exports = {
  addNewData,
};
