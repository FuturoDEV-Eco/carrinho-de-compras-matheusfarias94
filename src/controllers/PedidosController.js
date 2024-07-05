const Database = require("../database/Connection");

class PedidoController extends Database {
  async criar(request, response) {
    const dados = request.body;
    let total = 0;
    
    try {
      // Reune todos os IDs dos produtos e armazena na variavel
      const idProdutos = dados.products.map(item => item.product_id);
      
      // Consulta todos os preços dos produtos que estao armazenados em 'idProdutos'
      const produtosAtuais = await this.database.query(
        `SELECT product_id, price FROM products WHERE product_id = ANY($1)`,
        [idProdutos]
      );

      //Criado objeto para mapear os IDs dos produtos aos seus respectivos preços, facilitando o acesso a esses preços posteriormente.
      const productPriceMap = {};
      produtosAtuais.rows.forEach(product => {
        productPriceMap[product.product_id] = product.price;
      });

      // Calculo valor total
      for (const item of dados.products) {
        if (productPriceMap[item.product_id] !== undefined) {
          total += productPriceMap[item.product_id] * item.amount;
        } else {
          console.log(`Produto com ID ${item.product_id} não encontrado.`);
        }
      }

      console.log(total);
      response.json({ total });

      // inserção do pedido no banco de dados
      const meuPedido = await this.database.query(
        `INSERT INTO orders (id_clients, adress, observations, total) VALUES ($1, $2, $3, $4) RETURNING *`,
        [dados.id_clients, dados.adress, dados.observations, total]
      );

      // Inserção dos itens do pedido no banco de dados
      for (const item of dados.products) {
        await this.database.query(
          `INSERT INTO orders_items (id_orders, product_id, amount, price) VALUES ($1, $2, $3, $4) RETURNING *`,
          [
            meuPedido.rows[0].id_orders,
            item.product_id,
            item.amount,
            productPriceMap[item.product_id]
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao processar o pedido:", error);
      response.status(500).json({ error: "Erro ao processar o pedido" });
    }
  }
}

module.exports = PedidoController;