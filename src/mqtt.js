import * as mqtt from "mqtt";
import sensorService from "./services/sensorService";
import sensorDataService from "./services/sensorDataService";

//setup mqtt
const host = "10.13.9.39";
const port = 1883;
const clientId = `77c4898a-7158-4936-ac62-1681096fd2fd`;
const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect("mqtt://broker.hivemq.com:1883", {
  username: "lamntk",
  password: "123",
}); // create a client

client.on("connect", function () {
  client.subscribe("sensor", function (err) {
    if (!err) {
      console.log("Connected");
    }
  });
});

client.on("message", async (topic, message) => {
  // console.log(JSON.parse(message));
  if (topic == "sensor") {
    if (message) {
      // Check data
      const { keyCode, ...sensorData } = JSON.parse(message);
      // console.log(keyCode, { ...sensorData, keyCode });
      // Send data to database
      const sersorId = await sensorService.getSensorsIdByKeyCode(keyCode);
      await sensorDataService.createNewSensorData({ ...sensorData, sersorId });
    }
  }
});

module.exports = client;
