const { Router } = require("express");
const PedidosController = require("../controllers/PedidosController")

const pedidosRoutes = new Router();
const pedidosController = new PedidosController();

pedidosRoutes.post("/", pedidosController.criar.bind(pedidosController));



module.exports = pedidosRoutes;
