import mongoose from "mongoose";

export const DBConnection = () => {
    mongoose.connect(process.env.DBConnection).then(() => {
        console.log("DB Connected Successfully ...");
    }).catch(() => {
        console.log("DB Faild To Connect ....");
    })
}



