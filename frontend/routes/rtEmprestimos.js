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
    
    return res.redirect('/emprestimos/ManutEmprestimos');

});

router.get('/ConsultarEmprestimos', authenticationMiddleware, emprestimosApp.consultarEmprestimos);

router.get('/ManutEmprestimos', authenticationMiddleware, emprestimosApp.manutEmprestimos); 

module.exports = router;