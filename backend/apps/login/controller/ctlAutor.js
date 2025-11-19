const mdlAutor = require("../model/mdlAutor");


const getAllAutores = async (req, res) => {
    const registro = await mdlAutor.getAllAutores();
    res.json({ status: "ok", "registro": registro});
};

const getAutorByID = async (req, res) => {
    const autorID = parseInt(req.body.id);
    const registro = await mdlAutor.getAutorByID(autorID);
    res.json({ status: "ok", "registro": registro });
};

const insertAutor = async (req, res) => {
    const registro = await mdlAutor.insertAutor(req.body);
    res.json({ status: "ok", "registro": registro});
};

const updateAutor = async (req, res) => {
    const registro = await mdlAutor.updateAutor(req.body);
    res.json({ status: "ok", "registro": registro });
};

const deleteAutor = async (req, res) => {
    const registro = await mdlAutor.deleteAutor(req.body);
    res.json({ status: "ok", "registro": registro });
};

module.exports = {
    getAllAutores,
    getAutorByID,
    insertAutor,
    updateAutor,
    deleteAutor,
};