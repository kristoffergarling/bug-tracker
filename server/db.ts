const mongoose = require("mongoose");

export const connectToDataBase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }).then(conn => {
        console.log("Connected to MongoDB; " + conn.connection.host);
    })
}