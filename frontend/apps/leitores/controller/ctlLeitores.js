
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


                  return res.render("leitores/view/vwManutLeitores.njk", {
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

                  return res.render("leitores/view/vwManutLeitores.njk", {
                        title: "Manutenção de Leitores Correntes",
                        data: null,
                        erro: remoteMSG,
                        userName: userName,
                  });
            }
      })();

/*
const insertContas = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      
      
      return res.render("contas/view/vwFCrContas.njk", { 
        title: "Cadastro de Nova Conta",
        data: null,
        erro: null,
        userName: req.session.userName,
      });

    } else {
      
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertContas", regData, { 
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
        console.error('[ctlContas|InsertContas] Erro ao inserir dados no servidor backend:', error.message);
        return res.json({
          status: "Error",
          msg: error.message,
          data: null, 
          erro: null,
        });
      }
    }
  })();


const ViewConta = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        
        let response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/GetContaByID", 
          {
            idconta: id, 
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          
          
          return res.render("contas/view/vwFRUDrContas.njk", { 
            title: "Visualização de Conta",
            data: response.data.registro[0],
            disabled: true, 
            userName: userName,
          });
        } else {
          console.log("[ctlContas|ViewConta] ID de conta não localizado!");
          
          return res.redirect('/contas/ManutContas');
        }
      }
     
      return res.redirect('/leitores/ManutLeitores'); 
    } catch (erro) {
      return res.json({ status: "[ctlContas.js|ViewConta] Conta não localizada!" }); 
    }
  })();*/

/*
const UpdateConta = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        
        let response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/GetContaByID", 
          {
            idconta: id, 
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          
          
          return res.render("contas/view/vwFRUDrContas.njk", { 
            title: "Atualização de Conta",
            data: response.data.registro[0],
            disabled: false, 
            userName: userName,
          });
        } else {
          console.log("[ctlContas|UpdateConta] Dados não localizados");
          
          return res.redirect('/contas/ManutContas');
        }
      } else {
        
        const regData = req.body;
        const token = req.session.token;

        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateContas", regData, { 
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
          console.error('[ctlContas.js|UpdateConta] Erro ao atualizar dados no servidor backend:', error.message);
          return res.json({ 
            status: "Error",
            msg: error.message,
            data: null,
            erro: null,
          });
        }
      }
      
      return res.redirect('/contas/ManutContas'); 
    } catch (erro) {
      return res.json({ status: "[ctlContas.js|UpdateConta] Conta não localizada!" });
    }
  })();


const DeleteConta = async (req, res) =>
  (async () => {
    
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteContas", regData, { 
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
      console.error('[ctlContas.js|DeleteConta] Erro ao deletar dados no servidor backend:', error.message);
      return res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();*/

module.exports = {
      manutLeitores,
      consultarLeitores

};
