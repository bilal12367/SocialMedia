import mongoose from "mongoose"
const connectDB = async () => {
    mongoose.connect(process.env.MONGO_TEST,()=>{
        console.log("Connected To Mongodb");
    })
}

export default connectDB;