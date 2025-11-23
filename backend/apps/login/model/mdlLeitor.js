const db = require("../../../database/databaseconfig");

const getAllLeitores = async () => {
    return (
        await db.query(
            "SELECT * FROM leitor WHERE Removido = false ORDER BY Nome ASC"
        )
    ).rows;
};

const getLeitorByID = async (idPar) => {
    return (
        await db.query(
            "SELECT * FROM leitor WHERE ID = $1 AND Removido = false",
            [idPar]
        )
    ).rows;
};

const insertLeitor = async (registroPar) => {
    return (
        await db.query(
            "INSERT INTO leitor (Nome, Email, Telefone, Removido) VALUES ($1, $2, $3, false) RETURNING *",
            [
                registroPar.nome,
                registroPar.email,
                registroPar.telefone
            ]
        )
    ).rows;
};

const updateLeitor = async (registroPar) => {
    return (
        await db.query(
            "UPDATE leitor SET Nome = $2, Email = $3, Telefone = $4 WHERE ID = $1 AND Removido = false RETURNING *",
            [
                registroPar.id,
                registroPar.nome,
                registroPar.email,
                registroPar.telefone
            ]
        )
    ).rows;
};

const deleteLeitor = async (registroPar) => {
    return (
        await db.query(
            "UPDATE leitor SET Removido = true WHERE ID = $1 AND Removido = false RETURNING *",
            [registroPar.id]
        )
    );rows;
};

module.exports = {
    getAllLeitores,
    getLeitorByID,
    insertLeitor,
    updateLeitor,
    deleteLeitor,
};