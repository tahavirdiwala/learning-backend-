const sendResponse = require("../common");
const { StatusCodes } = require("http-status-codes");
const { Categories } = require("../models/associations");

class CategoriesController {
  add(req, res, next) {
    Categories.create({
      name: req.body.name,
      image: req.file.filename,
    })
      .then((category) => {
        sendResponse(
          res,
          StatusCodes.CREATED,
          "Category added successfully",
          category
        );
      })
      .catch(() =>
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "something went wrong",
          `${next}`
        )
      );
  }
  getAll(req, res) {
    Categories.findAndCountAll()
      .then((response) => {
        sendResponse(
          res,
          StatusCodes.OK,
          "Category fetched successfully",
          response
        );
      })
      .catch((err) => {
        sendResponse(res, StatusCodes.BAD_REQUEST, `${err}`);
      });
  }
}

module.exports = new CategoriesController();
