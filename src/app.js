const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();
require("./models"); 

const app = express();
app.use(cors({
  origin: ["http://localhost:3001", "http://127.0.0.1:3001"],
  credentials: true
}));



app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/projects", require("./routes/project"));
app.use("/bugs", require("./routes/bug"));



app.get("/", (req, res) => {
  res.json({ message: "Bug Tracker API is running" });
});


sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("DB error:", err));


sequelize
  .sync({ alter: true })
  .then(() => console.log("DB synced"))
  .catch(err => console.log("Sync error:", err));

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
});

