const express = require("express");
const { loggedIn } = require("../middleware/validate");
const reviewsRouter = express.Router();

//get: all reviews by user
reviewsRouter.get("/reviews/all", loggedIn, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//post: create new review
reviewsRouter.post(
  "/reviews/new/product/:id",
  loggedIn,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

//put: update review
reviewsRouter.put(
  "/reviews/update/product/:id",
  loggedIn,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

//delete: delete review
reviewsRouter.delete(
  "/reviews/delete/product/:id",
  loggedIn,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

module.exports = reviewsRouter;
