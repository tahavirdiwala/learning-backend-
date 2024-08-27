const sendResponse = require("../common");
const { Products, Categories } = require("../models/associations");
const { StatusCodes } = require("http-status-codes");

const getPagination = (page, size) => {
  const limit = size ? +size : 6;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: count, rows: rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);

  return { count, rows };
};

class ProductController {
  add(req, res, next) {
    Products.create(req.body)
      .then((result) =>
        sendResponse(
          res,
          StatusCodes.CREATED,
          "Product added successfully",
          result
        )
      )
      .catch(() => sendResponse(res, StatusCodes.BAD_REQUEST, `${next}`));
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
      .then((data) => {
        const response = getPagingData(data, page, limit);

        sendResponse(
          res,
          StatusCodes.OK,
          "products fetched successfully",
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
  get(req, res) {
    const id = req.params.productId;
    Products.findByPk(id)
      .then((product) => {
        sendResponse(
          res,
          StatusCodes.OK,
          "product fetched successfully",
          product
        );
      })
      .catch((err) => sendResponse(res, StatusCodes.OK, `${err}`));
  }
  edit(req, res) {
    const id = req.params.productId;
    const newProduct = req.body;

    Products.findByPk(id).then((product) => {
      if (product) {
        Products.update(newProduct, { where: { id } }).then(() => {
          sendResponse(
            res,
            StatusCodes.OK,
            "Product Updated Successfully",
            newProduct
          );
        });
      } else {
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "Failed to Updated product Successfully"
        );
      }
    });
  }
}

module.exports = new ProductController();
