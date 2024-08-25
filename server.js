const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const router = require("./routes/products");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080/",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

const PORT = process.env.PORT || 8080;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
