import mongoose from "mongoose";

export const connectToDB = async() =>{
      try {
            await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/firewall',)
            console.log('Connected to MongoDB');

      } catch (error) {
            throw new Error(error);
            process.exit(1);
      }
}
