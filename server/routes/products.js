const router = require("express").Router();
const ProductController = require("../controllers/product.contoller");

router
  .route("/products")
  .post(ProductController.add)
  .get(ProductController.getAll);

router
  .route("/products/:productId")
  .get(ProductController.get)
  .put(ProductController.edit)
  .delete(ProductController.delete);

module.exports = router;
