const sendResponse = require("../common");
const { StatusCodes } = require("http-status-codes");
const { Categories } = require("../models/associations");
const fs = require("fs");
const path = require("path");

let __basedir = path.resolve(path.dirname(""));
class CategoriesController {
  add(req, res, next) {
    Categories.create({
      name: req.body.name,
      image: fs.readFileSync(__basedir + "/assets/" + req.file.filename),
    })
      .then((category) => {
        const filePath = __basedir + "/assets/" + category.name;

        fs.writeFileSync(filePath, category.image);

        const copy = {
          name: category.name,
          image: `/assets/${category.name}`,
        };

        sendResponse(
          res,
          StatusCodes.CREATED,
          "Category added successfully",
          copy
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
