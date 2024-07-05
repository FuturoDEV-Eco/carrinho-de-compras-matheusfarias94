const Database = require("../database/Connection");

class ClientController extends Database {
  async criar(request, response) {
    try {
      const dados = request.body;
      if (!dados.name || !dados.email || !dados.cpf) {
        return response.status(400).json({
          mensagem: "Nome, CPF e E-mail são obrigatórios",
        });
      }

      await this.database.query(
        `INSERT INTO clients (
        name,email,cpf,contact) values (
        $1,$2,$3,$4)`,
        [dados.name, dados.email, dados.cpf, dados.contact]
      );
      console.log(dados);
      response.status(201).json({ mensagem: `Cliente Cadastrado com sucesso` });
    } catch (error) {
      console.error("Erro ao cadastrar o cliente:", error);
      response
        .status(500)
        .json({ mensagem: ` Não foi possivel cadastrar o cliente` });
    }
  }
  async pesquisar(request, response) {
    try {
      const id_clients = request.params.id;
      const clients = await this.database.query(
        "select * from clients where id_clients = $1",
        [id_clients]
      );
      if (clients.rows.length === 0) {
        return response
          .status(404)
          .json({ mensagem: "Não foi encontrado um cliente" });
      }
      response.json(clients.rows[0]);
    } catch {
      response
        .status(500)
        .json({ mensagem: "Erro ao acessar o banco de dados" });
    }
  }
}

module.exports = ClientController;
