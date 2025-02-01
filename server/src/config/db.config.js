import mongoose from "mongoose";
import ServerConfig from "./server.config.js";

const connect = async () => {
  try {
    console.log(ServerConfig.DB_URL);
    await mongoose.connect(ServerConfig.DB_URL);
    console.log("Hurray! connected to mongoDB...");
  } catch (error) {
    console.log({ message: "Not able to connect to mongoDB", error });
  }
};

export default connect;
