const express = require("express");
const ordersRouter = express.Router();
const { loggedIn } = require("../middleware/validate.js");
const { prisma } = require("../../db/client.js");

//requires users to be logged in
ordersRouter.use(loggedIn, (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in." });
  next();
});

//get: gets all successfull orders
ordersRouter.get("/orders/complete", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const orders = await prisma.orders.findMany({
      where: { o_u_id: u_id, AND: { o_status: "complete" } },
    });
    return res.send(orders);
  } catch (error) {
    next(error);
  }
});

//get: gets all cancelled orders
ordersRouter.get("/orders/cancel", async (req, res, next) => {
  try {
    const { u_id } = req.user;
    const orders = await prisma.orders.findMany({
      where: { o_u_id: u_id, AND: { o_status: "cancel" } },
    });
    return res.send(orders);
  } catch (error) {
    next(error);
  }
});

//get: get all items in order
ordersRouter.get("/orders/order/details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //validate if order exist
    const order = await prisma.orders.findFirst({
      where: { o_id: Number(id) },
    });
    if (!order) return res.status(400).send({ error: "Order not found." });
    const items = await prisma.items.findMany({
      where: { i_o_id: Number(id) },
      include: { products: { select: { p_name: true } } },
    });
    return res.send(items);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
