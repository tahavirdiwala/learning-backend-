const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const product = require("./routes/products");
const categories = require("./routes/categories");
const AppConfig = require("./config").app;
const path = require("path");
const app = express();
const categoriesSeeder = require("./seeders/20240827141854-default-categories");
const { Categories } = require("./models/associations");

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
app.use("/assets", express.static(path.join(__dirname, "assets")));

const PORT = process.env.PORT || 8000;

sequelize.sync({ force: false }).then(async () => {
  const count = await Categories.count();

  if (count === 0) {
    await categoriesSeeder
      .up(sequelize.getQueryInterface(), sequelize)
      .then(() => {
        console.log("seeder ran successfully");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
