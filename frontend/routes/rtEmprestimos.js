var express = require('express');
var router = express.Router();
var emprestimosApp = require("../apps/emprestimos/controller/ctlEmprestimos");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;
    
    
    if (!isLogged) {
        return res.redirect("/Login");
    }
    
    
    next();
}


router.get('/', authenticationMiddleware, (req, res) => {
    
    // Ajustado para redirecionar para a CONSULTA, que é a tela inicial esperada.
    return res.redirect('/emprestimos/ConsultarEmprestimos');

});

// Rotas GET (Visualização/Carregamento de Página)
router.get('/ConsultarEmprestimos', authenticationMiddleware, emprestimosApp.consultarEmprestimos);
router.get('/ManutEmprestimos', authenticationMiddleware, emprestimosApp.manutEmprestimos); 

// Rotas POST (Manipulação de Dados via AJAX)
router.post('/InsertEmprestimo', authenticationMiddleware, emprestimosApp.insertEmprestimo);
router.post('/UpdateEmprestimo', authenticationMiddleware, emprestimosApp.updateEmprestimo);
router.post('/DeleteEmprestimo', authenticationMiddleware, emprestimosApp.deleteEmprestimo);


module.exports = router;