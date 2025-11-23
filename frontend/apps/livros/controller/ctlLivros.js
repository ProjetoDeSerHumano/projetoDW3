const axios = require("axios");
const moment = require("moment");

const consultarLivros = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        const apiUrl = process.env.SERVIDOR_DW3Back + "/GetAllLivros";

        try {
            const resp = await axios.get(apiUrl, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            });

            let livrosDaApi = resp.data.registro || [];

            const dadosFormatados = livrosDaApi.map(livro => ({
                id: livro.id,
                titulo: livro.titulo,
                nomeAutor: livro.nome_autor,

                //ajustando formato da data
                dataPublicacao: moment(livro.datapublicacao).format('DD/MM/YYYY'),

                edicaoCusto: livro.edicaocusto,
            }));

            return res.render("livros/view/vwConsultarLivros.njk", {
                title: "Consulta de Livros",
                data: dadosFormatados,
                erro: null,
                userName: userName,
            });

        } catch (error) {
            let remoteMSG = "Erro desconhecido ao carregar livros.";
            if (error.code === "ECONNREFUSED") {
                remoteMSG = "Servidor da API indisponível.";
            } else if (error.response && error.response.status === 401) {
                remoteMSG = "Sessão expirada ou não autenticada.";
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.render("livros/view/vwConsultarLivros.njk", {
                title: "Consulta de Livros",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        }
    })();

const manutLivros = async (req, res) =>
    (async () => {
        const { userName, token } = req.session;
        const livroId = req.query.id;
        let livroData = null;
        let autoresData = [];
        let title = "Cadastro de Novo Livro";
        let erro = null;

        const apiUrl = process.env.SERVIDOR_DW3Back;

        try {
            const respAutores = await axios.get(apiUrl + "/GetAllAutores", {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            });

            if (respAutores.data.registro) {
                autoresData = respAutores.data.registro;
            }

            if (livroId) {
                title = "Edição de Livro";

                const respLivro = await axios.post(apiUrl + "/GetLivroById", { id: livroId }, {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });

                let registro = respLivro.data.registro;

                if (Array.isArray(registro) && registro.length > 0) {
                    livroData = registro[0];

                    // 💡 CORREÇÃO DA DATA: Formata a data para o padrão HTML (YYYY-MM-DD)
                    if (livroData.datapublicacao) {
                        livroData.datapublicacao = moment(livroData.datapublicacao).format('YYYY-MM-DD');
                    }
                }

                if (!livroData) {
                    throw new Error("Livro com ID " + livroId + " não localizado no sistema.");
                }
            }

            return res.render("livros/view/vwManutLivros.njk", {
                title: title,
                data: livroData,
                autores: autoresData,
                erro: null,
                userName: userName,
            });

        } catch (error) {
            let remoteMSG = "Erro ao processar a requisição de manutenção.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.render("livros/view/vwManutLivros.njk", {
                title: title,
                data: livroData,
                autores: autoresData,
                erro: remoteMSG,
                userName: userName,
            });
        }
    })();


const insertLivro = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertLivro", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                timeout: 5000,
            });

            return res.json({ status: "ok", msg: "Livro inserido com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao inserir Livro.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.json({ status: "Error", msg: remoteMSG, data: null, erro: null });
        }
    })();


const updateLivro = async (req, res) =>
    (async () => {
        const token = req.session.token;
        const regData = req.body;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateLivro", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                timeout: 5000,
            });

            return res.json({ status: "ok", msg: "Livro atualizado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao atualizar Livro.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.json({ status: "Error", msg: remoteMSG, data: null, erro: null });
        }
    })();


const deleteLivro = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteLivro", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                timeout: 5000,
            });

            return res.json({ status: "ok", msg: "Livro deletado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao deletar Livro.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.json({ status: "Error", msg: remoteMSG, data: null, erro: null });
        }
    })();


module.exports = {
    consultarLivros,
    manutLivros,
    insertLivro,
    updateLivro,
    deleteLivro
};