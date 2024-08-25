const { Products, Categories } = require("../models/associations");

class ProductController {
  add(req, res, next) {
    Products.create(req.body)
      .then((result) => res.json(result))
      .catch(next);
  }
  getAll(req, res, next) {
    Products.findAll({
      include: [
        {
          model: Categories,
          as: "category",
          required: true,
        },
      ],
      schema: "product_schema",
    })
      .then((result) => res.json(result))
      .catch(next);
  }
  get(req, res, next) {
    const id = req.params.productId;
    Products.findByPk(id)
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  }
}

module.exports = new ProductController();
