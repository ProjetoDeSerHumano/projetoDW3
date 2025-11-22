const db = require('../../../database/databaseconfig');

//query simplificada do getAllLivro : "SELECT * FROM livro WHERE Removido = false ORDER BY Titulo ASC"

const getAllLivros = async () => {
    return (
        await db.query(
            `SELECT 
                Livro.ID, 
                Livro.Titulo, 
                Livro.AutorID, 
                Livro.DataPublicacao, 
                Livro.EdicaoCusto,
                Autor.Nome AS nome_autor 
             FROM Livro 
             INNER JOIN Autor ON Livro.AutorID = Autor.ID
             WHERE Livro.Removido = false AND Autor.Removido = false
             ORDER BY Livro.Titulo ASC`
        )
    ).rows;
};

const getLivroByID = async (idPar) => {
    return (
        await db.query(
            "SELECT * FROM livro WHERE ID = $1 AND Removido = false",
            [idPar]
        )
    ).rows;
};

const insertLivro = async (registroPar) => {
    return (
        await db.query(
            "INSERT INTO livro (Titulo, AutorID, DataPublicacao, EdicaoCusto, Removido) VALUES ($1, $2, $3, $4, false) RETURNING *",
            [
                registroPar.titulo,
                registroPar.autorid,
                registroPar.datapublicacao,
                registroPar.edicaocusto
            ]
        )
    ).rows;
};

const updateLivro = async (registroPar) => {
    return (
        await db.query(
            "UPDATE livro SET Titulo = $2, AutorID = $3, DataPublicacao = $4, EdicaoCusto = $5 WHERE ID = $1 AND REMOVIDO = false RETURNING *",
            [
                registroPar.id,
                registroPar.titulo,
                registroPar.autorid,
                registroPar.datapublicacao,
                registroPar.edicaocusto
            ]
        )
    ).rows;
};

const deleteLivro = async (registroPar) => {
    return (
        await db.query(
            "UPDATE Livro SET Removido = true WHERE ID = $1 AND Removido = false RETURNING *",
            [registroPar.id]
        )
    ).rows;
};

module.exports = {
    getAllLivros,
    getLivroByID,
    insertLivro,
    updateLivro,
    deleteLivro,
};