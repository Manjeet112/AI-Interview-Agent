import mongoose, { trusted } from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:trusted
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    credits:{
        type:Number,
        default:200
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema)
export default User;

