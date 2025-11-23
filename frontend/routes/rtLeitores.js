var express = require('express');
var router = express.Router();
var leitoresApp = require("../apps/leitores/controller/ctlLeitores");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;
    
    
    if (!isLogged) {
        return res.redirect("/Login");
    }
    
    
    next();
}


router.get('/', authenticationMiddleware, (req, res) => {
    
    return res.redirect('/leitores/ConsultarLeitores');

});


router.get('/ConsultarLeitores', authenticationMiddleware, leitoresApp.consultarLeitores);
router.get('/ManutLeitores', authenticationMiddleware, leitoresApp.manutLeitores);
router.get('/InsertLeitores', authenticationMiddleware, leitoresApp.insertLeitor); 
router.get('/UpdateLeitor/:id', authenticationMiddleware, leitoresApp.updateLeitor); 

router.post('/InsertLeitor', authenticationMiddleware, leitoresApp.insertLeitor); 
router.post('/UpdateLeitor', authenticationMiddleware, leitoresApp.updateLeitor); 
router.post('/DeleteLeitor', authenticationMiddleware, leitoresApp.deleteLeitor); 

module.exports = router;