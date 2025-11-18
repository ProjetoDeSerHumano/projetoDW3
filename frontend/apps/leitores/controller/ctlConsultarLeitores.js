const axios = require("axios");
const moment = require("moment"); 


const consultarLeitores = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    
    const apiUrl = process.env.SERVIDOR_DW3Back + "/GetAllLeitores";

    try {
      const resp = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });

      
      return res.render("leitores/view/vwConsultarLeitores.njk", { 
        title: "Manutenção de Leitores",
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
      
      return res.render("leitores/view/vwConsultarLeitores.njk", { 
        title: "Manutenção de Leitores",
        data: null,
        erro: remoteMSG, 
        userName: userName,
      });
    }
  })();

module.exports = {
  consultarLeitores
  
};
