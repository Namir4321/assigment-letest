require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const AuthRoutes = require("./Routes/AuthRoute");
const BookRoutes = require("./Routes/BookRoute");

app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/book", BookRoutes);

app.listen(port, () => {
  console.log(`listning at port ${port}`);
});
