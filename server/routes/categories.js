const router = require("express").Router();
const CategoriesController = require("../controllers/categories.controller");
const homeController = require("../controllers/home");
const upload = require("../middleware/upload");

router.get("/", homeController.getHome);

router
  .route("/categories")
  .post(upload.single("image"), CategoriesController.add)
  .get(CategoriesController.getAll);

module.exports = router;
