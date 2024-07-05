const express = require("express");
const clientsRoutes = require("./src/routes/clients.routes");
const productsRoutes = require("./src/routes/products.routes");
const pedidosRoutes = require("./src/routes/pedidos.routes");



const app = express();
const port = 3000;


app.use(express.json());

app.use("/clients", clientsRoutes);
app.use("/products", productsRoutes);
app.use("/pedidos", pedidosRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
