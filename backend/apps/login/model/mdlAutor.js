const db = require("../../../database/databaseconfig");

//APIs obrigatórias

const getAllAutores = async () => {
    return (
        await db.query(
            "SELECT * FROM autor WHERE removido = false ORDER BY nome ASC"
        )
    ).rows;
};

const getAutorByID = async (idPar) => {
    return (
        await db.query(
            "SELECT * FROM autor WHERE ID = $1 AND removido = false",
            [idPar]
        )
    ).rows;
};

const insertAutor = async (registroPar) => {
    return(
        await db.query(
            "INSERT INTO autor (nome, nacionalidade, removido) VALUES ($1, $2, false) RETURNING *",
            [registroPar.nome, registroPar.nacionalidade]
        )
    ).rows;
};

const updateAutor = async (registroPar) => {
    return (
        await db.query(
            "UPDATE autor SET nome = $2, nacionalidade = $3 WHERE ID = $1 AND removido = false RETURNING *",
            [registroPar.id, registroPar.nome, registroPar.nacionalidade]
        )
    ).rows;
};

const deleteAutor = async (registroPar) => {
    return (
        await db.query(
            "UPDATE autor SET removido = true WHERE ID = $1 AND removido = false RETURNING *",
            [registroPar.id]
        )
    ).rows;
};

module.exports = {
    getAllAutores,
    getAutorByID,
    insertAutor,
    updateAutor,
    deleteAutor,
};