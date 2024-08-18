import mongoose, { mongo } from "mongoose";

const saleSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
      },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
    },
    instruction:{
        type:String,
    },
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

const Sale = mongoose.model("sale",saleSchema)