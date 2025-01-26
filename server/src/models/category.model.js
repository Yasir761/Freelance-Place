import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    coverPicture:{
        type:{
            public_id:String,
            url:String
        },
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    allGigs:[{
        type: Schema.Types.ObjectId,
        ref:"Gig"
    }],
    detailedDescription:{
        type: String,
    },
},{timestamps:true})

export const Category = mongoose.model("Category" , categorySchema);