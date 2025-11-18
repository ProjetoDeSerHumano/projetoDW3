var express = require('express');
var router = express.Router();
var autoresConsultarApp = require("../apps/autores/controller/ctlConsultarAutores");

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


router.get('/ConsultarAutores', authenticationMiddleware, autoresConsultarApp.consultarAutores); 
/*router.get('/InsertContas', authenticationMiddleware, contasApp.insertContas); 
router.get('/ViewConta/:id', authenticationMiddleware, contasApp.ViewConta); 
router.get('/UpdateConta/:id', authenticationMiddleware, contasApp.UpdateConta); 

router.post('/InsertContas', authenticationMiddleware, contasApp.insertContas); 
router.post('/UpdateContas', authenticationMiddleware, contasApp.UpdateConta); 
router.post('/DeleteContas', authenticationMiddleware, contasApp.DeleteConta); */

module.exports = router;