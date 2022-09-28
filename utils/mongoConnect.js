import mongoose from "mongoose"
const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI,()=>{
        console.log("Connected To Mongodb");
    })
}

export default connectDB;