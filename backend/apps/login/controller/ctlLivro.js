const mdlLivro = require("../../login/model/mdlLivro.js");

const getAllLivros = async (req, res) => {
    const registro = await mdlLivro.getAllLivros();
    res.json({ status: "ok", "registro": registro});
};

const getLivroByID = async (req, res) => {
    const livroID = parseInt(req.body.id);
    const registro = await mdlLivro.getLivroByID(livroID);
    res.json({ status: "ok", "registro": registro });
};

const insertLivro = async (req, res) => {
    const registro = await mdlLivro.insertLivro(req.body);
    res.json({ status: "ok", "registro": registro});
};

const updateLivro = async (req, res) => {
    const registro = await mdlLivro.updateLivro(req.body);
    res.json({ status: "ok", "registro": registro });
};

const deleteLivro = async (req, res) => {
    const registro = await mdlLivro.deleteLivro(req.body);
    res.json({ status: "ok", "registro": registro });
};

module.exports = {
    getAllLivros,
    getLivroByID,
    insertLivro,
    updateLivro,
    deleteLivro,
};