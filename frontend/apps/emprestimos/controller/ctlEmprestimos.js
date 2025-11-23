
const axios = require("axios");
const moment = require("moment");

const formatarParaExibicao = (dataISO) => {
    return dataISO ? moment(dataISO).format('DD/MM/YYYY') : '';
};

const formatarParaInputDate = (dataISO) => {
    return dataISO ? moment(dataISO).format('YYYY-MM-DD') : '';
};

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

            let emprestimosDaApi = resp.data.registro || [];

            const dadosFormatados = emprestimosDaApi.map(emp => ({
                id: emp.id,
                tituloLivro: emp.tituloLivro,
                nomeLeitor: emp.nomeLeitor,
                dataEmprestimo: formatarParaExibicao(emp.dataemprestimo),
                dataDevolucaoPrevista: formatarParaExibicao(emp.datadevolucaoprevista),
                status: emp.status,
            }));


            return res.render("emprestimos/view/vwConsultarEmprestimos.njk", {
                title: "Consulta de Empréstimos",
                data: dadosFormatados,
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
                title: "Consulta de Empréstimos",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        }
    })();

const manutEmprestimos = async (req, res) =>
    (async () => {
        const { userName, token } = req.session;
        const emprestimoId = req.query.id;
        let emprestimoData = null;
        let leitoresData = [];
        let livrosData = [];
        let title = "Registro de Novo Empréstimo";
        let erro = null;

        const apiUrl = process.env.SERVIDOR_DW3Back;

        try {
            const [respLeitores, respLivros] = await Promise.all([
                axios.get(apiUrl + "/GetAllLeitores", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(apiUrl + "/GetAllLivros", { headers: { Authorization: `Bearer ${token}` } })
            ]);

            if (respLeitores.data.registro) leitoresData = respLeitores.data.registro;
            if (respLivros.data.registro) livrosData = respLivros.data.registro;

            if (emprestimoId) {
                title = "Edição de Empréstimo";

                const respEmprestimo = await axios.post(apiUrl + "/GetEmprestimoById", { id: emprestimoId }, {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });

                let registro = respEmprestimo.data.registro;

                if (Array.isArray(registro) && registro.length > 0) {
                    emprestimoData = registro[0];

                    if (emprestimoData.dataemprestimo) {
                        emprestimoData.dataemprestimo = formatarParaInputDate(emprestimoData.dataemprestimo);
                    }
                    if (emprestimoData.datadevolucaoprevista) {
                        emprestimoData.datadevolucaoprevista = formatarParaInputDate(emprestimoData.datadevolucaoprevista);
                    }
                }

                if (!emprestimoData) {
                    throw new Error("Empréstimo com ID " + emprestimoId + " não localizado.");
                }
            }


            return res.render("emprestimos/view/vwManutEmprestimos.njk", {
                title: title,
                data: emprestimoData,
                leitores: leitoresData,
                livros: livrosData,
                erro: null,
                userName: userName,
            });

        } catch (error) {
            let remoteMSG = "Erro ao carregar dados de manutenção.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.render("emprestimos/view/vwManutEmprestimos.njk", {
                title: title,
                data: emprestimoData,
                leitores: leitoresData,
                livros: livrosData,
                erro: remoteMSG,
                userName: userName,
            });
        }
    })();

const insertEmprestimo = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertEmprestimo", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                timeout: 5000,
            });

            return res.json({ status: "ok", msg: "Empréstimo registrado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao registrar Empréstimo.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.json({ status: "Error", msg: remoteMSG, data: null, erro: null });
        }
    })();

const updateEmprestimo = async (req, res) =>
    (async () => {
        const token = req.session.token;
        const regData = req.body;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateEmprestimo", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                timeout: 5000,
            });

            return res.json({ status: "ok", msg: "Empréstimo atualizado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao atualizar Empréstimo.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.json({ status: "Error", msg: remoteMSG, data: null, erro: null });
        }

    })();

const deleteEmprestimo = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteEmprestimo", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                timeout: 5000,
            });

            return res.json({ status: "ok", msg: "Empréstimo deletado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao deletar Empréstimo.";
            if (error.response && error.response.data && error.response.data.msg) {
                remoteMSG = error.response.data.msg;
            } else if (error.message) {
                remoteMSG = error.message;
            }

            return res.json({ status: "Error", msg: remoteMSG, data: null, erro: null });
        }
    })();


module.exports = {
    consultarEmprestimos,
    manutEmprestimos,
    insertEmprestimo,
    updateEmprestimo,
    deleteEmprestimo
};