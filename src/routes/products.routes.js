const { Router } = require("express");
const ProductController = require("../controllers/ProductsController");


const productsRoutes = new Router();
const productsController = new ProductController();

productsRoutes.post("/", productsController.criar.bind(productsController));
productsRoutes.get("/:id", productsController.pesquisar.bind(productsController));



module.exports = productsRoutes;