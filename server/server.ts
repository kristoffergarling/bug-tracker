import app from "./app";
import { connectToDataBase } from "./db";

connectToDataBase();

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: " + process.env.PORT );
})