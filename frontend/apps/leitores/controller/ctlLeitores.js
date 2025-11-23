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

  
const manutLeitores = async (req, res) =>
  (async () => {
    const { userName, token } = req.session;

    const leitorId = req.query.id;

    let leitorData = null; 
    let title = "Cadastro de Novo Leitor";
    let erro = null;

    if (leitorId) {
      title = "Edição de Leitor";
      try {
        const apiUrl = `${process.env.SERVIDOR_DW3Back}/GetLeitorById`; // Endpoint ajustado

        const resp = await axios.post(apiUrl, { id: leitorId }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        let registro = resp.data.registro;

        if (Array.isArray(registro) && registro.length > 0) {
          leitorData = registro[0];
        }

        if (!leitorData) {
          throw new Error("Leitor com ID " + leitorId + " não localizado no sistema.");
        }


      } catch (error) {
        console.error('[ctlLeitores|manutLeitores] Erro ao buscar leitor:', error.message);
        let remoteMSG = "Erro ao carregar os dados do leitor. Verifique o console do servidor.";
        if (error.response && error.response.data && error.response.data.msg) {
          remoteMSG = error.response.data.msg;
        } else if (error.message) {
          remoteMSG = error.message;
        }
        erro = remoteMSG;
      }
    }

    return res.render("leitores/view/vwManutLeitores.njk", {
      title: title,
      data: leitorData,
      erro: erro,
      userName: userName,
    });
  })();


const insertLeitor = async (req, res) =>
  (async () => {
    if (req.method == "GET") {

      return res.render("leitores/view/vwManutLeitores.njk", {
        title: "Cadastro de Novo Leitor",
        data: null,
        erro: null,
        userName: req.session.userName,
      });

    } else {

      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertLeitor", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
        });

        return res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('[ctlLeitores|InsertLeitor] Erro ao inserir dados no servidor backend:', error.message);
        return res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  })();
// ---

const updateLeitor = async (req, res) =>
  (async () => {
    const token = req.session.token;
    const regData = req.body;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateLeitor", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });

      return res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlLeitores.js|UpdateLeitor] Erro ao atualizar dados no servidor backend:', error.message);

      let remoteMSG = "Erro desconhecido ao atualizar.";
      if (error.response && error.response.data && error.response.data.msg) {
        remoteMSG = error.response.data.msg;
      } else if (error.message) {
        remoteMSG = error.message;
      }

      return res.json({
        status: "Error",
        msg: remoteMSG,
        data: null,
        erro: null,
      });
    }

  })();

// ---

const deleteLeitor = async (req, res) =>
  (async () => {

    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteLeitor", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });

      return res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlLeitores.js|DeleteLeitor] Erro ao deletar dados no servidor backend:', error.message);
      return res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

module.exports = {
  manutLeitores,
  consultarLeitores,
  insertLeitor,
  updateLeitor,
  deleteLeitor

};
