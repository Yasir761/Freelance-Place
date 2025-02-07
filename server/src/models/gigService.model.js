import mongoose, { Schema } from "mongoose";

const gigServiceSchema = new Schema({
    serviceTitle:{
        type:String,
        required:true,
    },
    serviceDescription:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        default:0,
    },
    deliveryTime:{
        type:Number,
        required:true,
    },
    revisions:{
        type:Number,
        default:0
    },
    features:{
        type:[String],
        required:true,
    },
},{timestamps:true});

export const GigService = mongoose.model("GigService", gigServiceSchema);