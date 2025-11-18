const axios = require("axios");
const moment = require("moment"); 


const consultarEmprestimos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    
    const apiUrl = process.env.SERVIDOR_DW3Back + "/GetAllEmprestimos";

    try {
      const resp = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });

      
      return res.render("emprestimos/view/vwConsultarEmprestimos.njk", { 
        title: "Manutenção de Emprestimos",
        data: resp.data.registro,
        erro: null,
        userName: userName,
      });

    } catch (error) {
      let remoteMSG = "Erro desconhecido";
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor da API indisponível.";
      } else if (error.response && error.response.status === 401) {
        remoteMSG = "Sessão expirada ou não autenticada.";
      } else if (error.message) {
        remoteMSG = error.message;
      }
      
      return res.render("emprestimos/view/vwConsultarEmprestimos.njk", { 
        title: "Manutenção de Emprestimos",
        data: null,
        erro: remoteMSG, 
        userName: userName,
      });
    }
  })();

module.exports = {
  consultarEmprestimos
  
};
