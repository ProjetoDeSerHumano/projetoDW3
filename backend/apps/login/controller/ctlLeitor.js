const mdlLeitor = require("../model/mdlLeitor.js");


const getAllLeitores = async (req, res) => {
    const registro = await mdlLeitor.getAllLeitores();
    res.json({ status: "ok", "registro": registro});
};

const getLeitorByID = async (req, res) => {
    const LeitorID = parseInt(req.body.id);
    const registro = await mdlLeitor.getLeitorByID(LeitorID);
    res.json({ status: "ok", "registro": registro });
};

const insertLeitor = async (req, res) => {
    const registro = await mdlLeitor.insertLeitor(req.body);
    res.json({ status: "ok", "registro": registro});
};

const updateLeitor = async (req, res) => {
    const registro = await mdlLeitor.updateLeitor(req.body);
    res.json({ status: "ok", "registro": registro });
};

const deleteLeitor = async (req, res) => {
    const registro = await mdlLeitor.deleteLeitor(req.body);
    res.json({ status: "ok", "registro": registro });
};

module.exports = {
    getAllLeitores,
    getLeitorByID,
    insertLeitor,
    updateLeitor,
    deleteLeitor,
};