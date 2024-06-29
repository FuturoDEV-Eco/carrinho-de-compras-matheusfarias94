const { Router } = require("express");
const ClientController = require("../controllers/ClientController");

const clientsRoutes = new Router();
const clientController = new ClientController();

clientsRoutes.post("/", clientController.criar.bind(clientController));
clientsRoutes.get("/:id", clientController.pesquisar.bind(clientController));



module.exports = clientsRoutes;
