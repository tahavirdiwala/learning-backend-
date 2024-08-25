const sendResponse = require("../common");
const { Products, Categories } = require("../models/associations");
const { StatusCodes } = require("http-status-codes");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

class ProductController {
  add(req, res, next) {
    Products.create(req.body)
      .then((result) => res.json(result))
      .catch(next);
  }
  getAll(req, res, next) {
    const { page, size, name, categoryId } = req.query;

    const { limit, offset } = getPagination(page, size);

    Products.findAndCountAll({
      where: {
        ...(name && { name }),
      },
      include: [
        {
          model: Categories,
          where: {
            ...(categoryId && { id: categoryId }),
          },
          as: "category",
          required: true,
        },
      ],
      limit,
      offset,
      schema: "product_schema",
    })
      .then((response) => {
        sendResponse(
          res,
          StatusCodes.OK,
          "product fetched successfully",
          response
        );
      })
      .catch(() => {
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "falied to fetched products",
          next
        );
      });
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
