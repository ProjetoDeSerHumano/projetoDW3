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

const manutAutores = async (req, res) =>
    (async () => {
        const { userName, token } = req.session;
        const autorId = req.query.id;
        let autorData = null;
        let title = "Cadastro de Novo Autor";
        let erro = null;

        if (autorId) {
            title = "Edição de Autor";
            try {
                const apiUrl = `${process.env.SERVIDOR_DW3Back}/GetAutorById`;

                const resp = await axios.post(apiUrl, { id: autorId }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                let registro = resp.data.registro;

                if (Array.isArray(registro) && registro.length > 0) {
                    autorData = registro[0];
                }

                if (!autorData) {
                    throw new Error("Autor com ID " + autorId + " não localizado no sistema.");
                }



            } catch (error) {
                console.error('[ctlAutores|manutAutores] Erro ao buscar autor:', error.message);
                let remoteMSG = "Erro ao carregar os dados do autor. Verifique o console do servidor.";
                if (error.response && error.response.data && error.response.data.msg) {
                    remoteMSG = error.response.data.msg;
                } else if (error.message) {
                    remoteMSG = error.message;
                }
                erro = remoteMSG;
            }
        }

        return res.render("autores/view/vwManutAutores.njk", {
            title: title,
            data: autorData,
            erro: erro,
            userName: userName,
        });
    })();




const insertAutor = async (req, res) =>
    (async () => {
        if (req.method == "GET") {

            return res.render("autores/view/vwManutAutores.njk", {
                title: "Cadastro de Novo autor",
                data: null,
                erro: null,
                userName: req.session.userName,
            });

        } else {

            const regData = req.body;
            const token = req.session.token;

            try {
                const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertAutor", regData, {
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
                console.error('[ctlAutores|InsertAutor] Erro ao inserir dados no servidor backend:', error.message);
                return res.json({
                    status: "Error",
                    msg: error.message,
                    data: null,
                    erro: null,
                });
            }
        }
    })();


const updateAutor = async (req, res) =>
    (async () => {
        const token = req.session.token;
        const regData = req.body;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateAutor", regData, {
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
            console.error('[ctlAutores.js|UpdateAutor] Erro ao atualizar dados no servidor backend:', error.message);

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

const deleteAutor = async (req, res) =>
    (async () => {

        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteAutor", regData, {
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
            console.error('[ctlAutores.js|DeleteAutor] Erro ao deletar dados no servidor backend:', error.message);
            return res.json({
                status: "Error",
                msg: error.message,
                data: null,
                erro: null,
            });
        }
    })();

module.exports = {
    consultarAutores,
    manutAutores,
    insertAutor,
    updateAutor,
    deleteAutor
};