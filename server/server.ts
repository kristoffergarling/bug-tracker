const express = require('express');
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://garlingdev:igelkott55@cluster0.jfjeg.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    } catch (err) {
        console.log(err);
    }
}

// connect();

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})