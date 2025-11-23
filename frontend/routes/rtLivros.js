var express = require('express');
var router = express.Router();
var livrosApp = require("../apps/livros/controller/ctlLivros");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }

    next();
}

router.get('/', authenticationMiddleware, (req, res) => {

    return res.redirect('/livros/ConsultarLivros');
});

// Rotas de Consulta e Formulário
router.get('/ConsultarLivros', authenticationMiddleware, livrosApp.consultarLivros);
router.get('/ManutLivros', authenticationMiddleware, livrosApp.manutLivros);
router.get('/InsertLivro', authenticationMiddleware, livrosApp.insertLivro); 
router.get('/UpdateLivro:id', authenticationMiddleware, livrosApp.updateLivro); 

// Rotas de Manipulação de Dados (CRUD - Via POST/AJAX)
router.post('/InsertLivro', authenticationMiddleware, livrosApp.insertLivro);
router.post('/UpdateLivro', authenticationMiddleware, livrosApp.updateLivro);
router.post('/DeleteLivro', authenticationMiddleware, livrosApp.deleteLivro);

module.exports = router;