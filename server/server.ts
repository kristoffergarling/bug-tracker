import app from "./app";
import mongoose from "mongoose";
import { createServer } from "http";
import { PORT, DB_URL } from "./utils/config";

const server = createServer(app);

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
