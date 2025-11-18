const axios = require("axios");
const moment = require("moment"); 


const consultarAutores = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    
    const apiUrl = process.env.SERVIDOR_DW3Back + "/GetAllAutores";

    try {
      const resp = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });

      
      return res.render("autores/view/vwConsultarAutores.njk", { 
        title: "Manutenção de Autores",
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
      
      return res.render("autores/view/vwConsultarAutores.njk", { 
        title: "Manutenção de Autores",
        data: null,
        erro: remoteMSG, 
        userName: userName,
      });
    }
  })();

module.exports = {
  consultarAutores
  
};
