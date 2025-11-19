const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin.js");
const appAutor = require("../apps/login/controller/ctlAutor.js");

routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Teste para o Sistema de Biblioteca.");
});

//Rotas AUTOR
routerApp.get("/getAllAutores", appAutor.getAllAutores);
routerApp.post("/getAutorByID", appAutor.getAutorByID);
routerApp.post("/insertAutor", appAutor.insertAutor);
routerApp.post("/updateAutor", appAutor.updateAutor);
routerApp.post("/deleteAutor", appAutor.deleteAutor);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;