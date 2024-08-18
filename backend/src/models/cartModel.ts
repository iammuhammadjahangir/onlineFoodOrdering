import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    items:[
        {
            name:{
                type:String,
                required:[true,"Please provide item name"]
            },
            description:{
                type:String,
                required:[true,"Please provide item description"]
            },
            category:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"category"
            },
            actualPrice:{
                type:Number,
                default:0
            },
            offerPrice:{
                type:Number,
                default:0
            },
            variation:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"variation"
            }
        }
    ]
},{
    timestamps:true
});

const Cart = mongoose.model("cart",cartSchema)