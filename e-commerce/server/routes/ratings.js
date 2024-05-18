const express = require("express");
const { loggedIn } = require("../middleware/validate");
const ratingsRouter = express.Router();

//get: get all ratings for user
ratingsRouter.get("/ratings/all", loggedIn, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//post: add rating
ratingsRouter.post(
  "/ratings/new/product/:id",
  loggedIn,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

//put: edit rating
ratingsRouter.put(
  "/ratings/update/product/:id",
  loggedIn,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

//delete: remove rating
ratingsRouter.delete(
  "/ratings/delete/product/:id",
  loggedIn,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

module.exports = ratingsRouter;
