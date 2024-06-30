const Database = require("../database/Connection");

class ProductController extends Database {
  async criar(request, response) {
    try {
      const dados = request.body;
      if (!dados.name || !dados.amount || !dados.voltage) {
        return response.status(400).json({
          mensagem: "Nome, valor e tensão são obrigatórios",
        });
      }

      await this.database.query(
        `insert into products (
        name,amount,color,voltage,description) values (
        $1,$2,$3,$4,$5)`,
        [
          dados.name,
          dados.amount,
          dados.color,
          dados.voltage,
          dados.description,
        ]
      );
      console.log(dados);
      response.status(201).json({ mensagem: `Produto Cadastrado com sucesso` });
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error);
      response
        .status(500)
        .json({ mensagem: ` Não foi possivel cadastrar o produto` });
    }
  }
  async listarTodos(request, response) {
    try {
      const products = await this.database.query("select * from products");

      response.status(200).json(products.rows);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      response
        .status(500)
        .json({ mensagem: "Erro ao acessar o banco de dados" });
    }
  }

  async listagemDetalhada(request, response) {
    try {
      const id = request.params.id;
      const products = await this.database.query(
        `SELECT 

              p.product_id AS product_id,
              p.name_product,
              p.amount,
              p.color,
              p.voltage,
              p.description,
              p.price,
              c.id_categories AS category_id,
              c.name_categories AS name_categories
            FROM 
              products p
            JOIN 
              categories c ON p.category_id = c.id_categories
              WHERE 
              p.product_id = $1`,
        [id]
        
      );
      if (products.rows.length === 0) {
        return response
          .status(404)
          .json({ mensagem: "Não foi encontrado um produto com esse ID" });
      }
      response.status(200).json(products.rows);
    } catch (error) {
      console.error("Erro ao buscar o item detalhado", error);
      response
        .status(500)
        .json({ mensagem: "Erro ao acessar o banco de dados" });
    }
  }
}

module.exports = ProductController;
