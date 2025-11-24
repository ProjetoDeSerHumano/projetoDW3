const axios = require("axios");
const moment = require("moment");

const formatarParaExibicao = (dataISO) => {
    return dataISO ? moment(dataISO).format('DD/MM/YYYY') : '';
};

const formatarParaInputDate = (dataISO) => {
    return dataISO ? moment(dataISO).format('YYYY-MM-DD') : '';
};

// 1. Consulta de Empréstimos
const consultarEmprestimos = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        const apiUrl = process.env.SERVIDOR_DW3Back + "/GetAllEmprestimos";

        try {
            const resp = await axios.get(apiUrl, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            });

            let emprestimosDaApi = resp.data.registro || [];

            // Mapeia e formata as datas para exibição na tabela
            const dadosFormatados = emprestimosDaApi.map(emp => ({
                id: emp.id,
                tituloLivro: emp.tituloLivro,
                nomeLeitor: emp.nomeLeitor,
                dataEmprestimo: formatarParaExibicao(emp.dataemprestimo),
                dataDevolucaoPrevista: formatarParaExibicao(emp.datadevolucaoprevista),
                status: emp.status,
                tituloLivro: emp.titulo_livro,
                nomeLeitor: emp.nome_leitor,
            }));

            return res.render("emprestimos/view/vwConsultarEmprestimos.njk", {
                title: "Consulta de Empréstimos",
                data: dadosFormatados,
                erro: null,
                userName: userName,
            });

        } catch (error) {
            let remoteMSG = "Erro ao carregar lista de empréstimos.";
            // ... (Lógica de tratamento de erro) ...
            return res.render("emprestimos/view/vwConsultarEmprestimos.njk", {
                title: "Consulta de Empréstimos", data: null, erro: remoteMSG, userName: userName,
            });
        }
    })();

// 2. Manutenção de Empréstimos (Carrega o Formulário)
const manutEmprestimos = async (req, res) =>
    (async () => {
        const { userName, token } = req.session;
        const emprestimoId = req.query.id;
        let emprestimoData = null;
        let leitoresData = [];
        let livrosData = [];
        let title = "Registro de Novo Empréstimo";
        const apiUrl = process.env.SERVIDOR_DW3Back;

        try {
            const [respLeitores, respLivros] = await Promise.all([
                axios.get(apiUrl + "/GetAllLeitores", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(apiUrl + "/GetAllLivros", { headers: { Authorization: `Bearer ${token}` } })
            ]);

            leitoresData = respLeitores.data.registro || [];
            livrosData = respLivros.data.registro || [];

            if (emprestimoId) {
                title = "Edição de Empréstimo";

                // Busca o empréstimo específico
                const respEmprestimo = await axios.post(apiUrl + "/GetEmprestimoById", { id: emprestimoId }, {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });

                let registro = respEmprestimo.data.registro;

                if (Array.isArray(registro) && registro.length > 0) {
                    emprestimoData = registro[0];

                    // Formata as datas para o padrão do input HTML (YYYY-MM-DD)
                    if (emprestimoData.dataemprestimo) {
                        emprestimoData.dataemprestimo = formatarParaInputDate(emprestimoData.dataemprestimo);
                    }
                    if (emprestimoData.datadevolucaoprevista) {
                        emprestimoData.datadevolucaoprevista = formatarParaInputDate(emprestimoData.datadevolucaoprevista);
                    }
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
            // ... (Lógica de tratamento de erro) ...
            return res.render("emprestimos/view/vwManutEmprestimos.njk", {
                title: title, data: null, leitores: leitoresData, livros: livrosData, erro: remoteMSG, userName: userName,
            });
        }
    })();


// 3. Inserir Empréstimo
const insertEmprestimo = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertEmprestimo", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });

            return res.json({ status: "ok", msg: "Empréstimo registrado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao registrar Empréstimo.";
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

// 5. Deletar Empréstimo
const deleteEmprestimo = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteEmprestimo", regData, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });

            return res.json({ status: "ok", msg: "Empréstimo deletado com sucesso.", data: response.data, erro: null });
        } catch (error) {
            let remoteMSG = "Erro ao deletar Empréstimo.";
            // ... (Lógica de tratamento de erro) ...
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