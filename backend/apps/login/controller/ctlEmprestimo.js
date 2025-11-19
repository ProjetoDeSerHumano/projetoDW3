const mdlEmprestimo = require("../model/mdlEmprestimo.js");

const getAllEmprestimos = async (req, res) => {
    const registro = await mdlEmprestimo.getAllEmprestimos();
    res.json({ status: "ok", "registro": registro});
};

const getEmprestimosByID = async (req, res) => {
    const emprestimoID = parseInt(req.body.id);
    const registro = await mdlEmprestimo.getEmprestimosByID(emprestimoID);
    res.json({ status: "ok", "registro": registro });
};

const insertEmprestimo = async (req, res) => {
    const registro = await mdlEmprestimo.insertEmprestimo(req.body);
    res.json({ status: "ok", "registro": registro});
};

const updateEmprestimo = async (req, res) => {
    const registro = await mdlEmprestimo.updateEmprestimo(req.body);
    res.json({ status: "ok", "registro": registro });
};

const deleteEmprestimo = async (req, res) => {
    const registro = await mdlEmprestimo.deleteEmprestimo(req.body);
    res.json({ status: "ok", "registro": registro });
};

module.exports = {
    getAllEmprestimos,
    getEmprestimosByID,
    insertEmprestimo,
    updateEmprestimo,
    deleteEmprestimo,
};