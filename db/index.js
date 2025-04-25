import mongoose from "mongoose";

const initDb = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "challenge_me",
    });
    console.log(`DB connected to ${mongo.connection.name}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default initDb;
