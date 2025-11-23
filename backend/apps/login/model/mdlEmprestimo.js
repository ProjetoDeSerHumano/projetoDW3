const db = require("../../../database/databaseconfig");

const getAllEmprestimos = async () => {
    return (
        await db.query(
           `SELECT
                Emprestimo.ID, 
                Emprestimo.DataEmprestimo, 
                Emprestimo.DataDevolucaoPrevista, 
                Emprestimo.Status,
                Emprestimo.LeitorID,
                Emprestimo.LivroID,
                Leitor.Nome AS nome_leitor,
                Livro.Titulo AS titulo_livro
             FROM Emprestimo
             INNER JOIN Leitor ON Emprestimo.LeitorID = Leitor.ID
             INNER JOIN Livro ON Emprestimo.LivroID = Livro.ID
             WHERE Emprestimo.Removido = false
             ORDER BY Emprestimo.DataEmprestimo DESC` 
        )
    ).rows;
};

const getEmprestimosByID = async (idPar) => {
    return (
        await db.query(
            "SELECT * FROM Emprestimo WHERE ID = $1 AND Removido = false",
            [idPar]
        )
    ).rows;
};

const insertEmprestimo = async (registroPar) => {
    return (
        await db.query(
            'INSERT INTO Emprestimo (LeitorID, LivroID, DataEmprestimo, DataDevolucaoPrevista, Status, Removido) VALUES ($1, $2, $3, $4, $5, false) RETURNING *',
            [
                registroPar.leitorid,
                registroPar.livroid,
                registroPar.dataemprestimo,
                registroPar.datadevolucaoprevista,
                registroPar.status
            ]
        )
    ).rows;
};

const updateEmprestimo = async (registroPar) => {
    return (
        await db.query(
            'UPDATE Emprestimo SET LeitorID = $2, LivroID = $3, DataEmprestimo = $4, DataDevolucaoPrevista = $5, Status = $6 WHERE ID = $1 AND Removido = false RETURNING *',
            [
                registroPar.id,
                registroPar.leitorid,
                registroPar.livroid,
                registroPar.dataemprestimo,
                registroPar.datadevolucaoprevista,
                registroPar.status
            ]
        )
    ).rows;
};

const deleteEmprestimo = async (registroPar) => {
    return (
        await db.query(
            "UPDATE Emprestimo SET Removido = true WHERE ID = $1 AND Removido = false RETURNING *",
            [
                registroPar.id
            ]
        )
    ).rows;
};

module.exports = {
    getAllEmprestimos,
    getEmprestimosByID,
    insertEmprestimo,
    updateEmprestimo,
    deleteEmprestimo,
};