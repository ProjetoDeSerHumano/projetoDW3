var express = require('express');
var router = express.Router();
var autoresApp = require("../apps/autores/controller/ctlAutores"); 

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;
    
    if (!isLogged) {
        return res.redirect("/Login");
    }
    
    next();
}

router.get('/', authenticationMiddleware, (req, res) => {

    return res.redirect('/autores/ConsultarAutores');

});

//rotas
router.get('/ConsultarAutores', authenticationMiddleware, autoresApp.consultarAutores);
router.get('/ManutAutores', authenticationMiddleware, autoresApp.manutAutores);
router.get('/InsertAutor', authenticationMiddleware, autoresApp.insertAutor); 
router.get('/UpdateAutor/:id', authenticationMiddleware, autoresApp.updateAutor); 

router.post('/InsertAutor', authenticationMiddleware, autoresApp.insertAutor); 
router.post('/UpdateAutor', authenticationMiddleware, autoresApp.updateAutor); 
router.post('/DeleteAutor', authenticationMiddleware, autoresApp.deleteAutor); 

module.exports = router;