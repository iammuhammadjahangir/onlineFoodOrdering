import mongoose from "mongoose";

export const connectDB = (uri:string) =>{
    mongoose.connect(uri,{
        dbName:"resturent"
    }).then((con)=>{
        console.log(`Connect to DB successfully ${con.connection.host}`)
    }).catch(e=>{
        console.log(e);
    })
}