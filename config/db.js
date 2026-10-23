import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://tarunsadhu52_db_user:1IqmFfJpcmmX5k5g@ac-bftyoij-shard-00-00.xvxofxp.mongodb.net:27017,ac-bftyoij-shard-00-01.xvxofxp.mongodb.net:27017,ac-bftyoij-shard-00-02.xvxofxp.mongodb.net:27017/?ssl=true&replicaSet=atlas-129k4o-shard-0&authSource=admin&appName=Cluster0"
    );
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


export default connectDb; 
