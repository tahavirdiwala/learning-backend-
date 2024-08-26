const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const product = require("./routes/products");
const categories = require("./routes/categories");
const AppConfig = require("./config").app;

const app = express();

app.use(
  cors({
    origin: AppConfig.clientHost,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", product);
app.use("/api", categories);

const PORT = process.env.PORT || 8000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
