const express = require("express");
const productsRouter = express.Router();
const { prisma } = require("../../db/client.js");

//get: all products
productsRouter.get("/products/all", async (req, res, next) => {
  try {
    const allProducts = await prisma.products.findMany();
    return res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

//get: single product based on product id
productsRouter.get("/products/single/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.products.findFirst({
      where: { p_id: Number(id) },
    });
    return product
      ? res.send(product)
      : res.status(404).send({ error: "Product not found." });
  } catch (error) {
    next(error);
  }
});

//get: product reviews based on product id
productsRouter.get("/products/single/reviews/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await prisma.reviews.findMany({
      where: { r_p_id: Number(id) },
      orderBy: { r_date: "desc" },
      include: { users: { select: { u_username: true } } },
    });
    return res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//get: product ratings based on product id
productsRouter.get("/products/single/ratings/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ratings = await prisma.rating.findMany({
      where: { r_p_id: Number(id) },
      include: { users: { select: { u_username: true } } },
    });
    //include average rating for product in response
    let avgRating = 0;
    ratings.forEach((rating) => (avgRating += rating.r_rating));
    avgRating /= ratings.length;
    return res.send({ ratings, avgRating: Number(avgRating.toFixed(2)) || 0 });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
