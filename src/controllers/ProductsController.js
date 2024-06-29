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
  async listarTodos(request,response) {
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
}

module.exports = ProductController;
