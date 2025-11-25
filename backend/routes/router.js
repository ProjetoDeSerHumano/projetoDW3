const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin.js");
const appAutor = require("../apps/login/controller/ctlAutor.js");
const appLivro = require("../apps/login/controller/ctlLivro.js");
const appLeitor = require("../apps/login/controller/ctlLeitor.js");
const appEmprestimos = require("../apps/login/controller/ctlEmprestimo.js");

routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Teste para o Sistema de Biblioteca.");
});

//Rotas AUTOR
routerApp.get("/getAllAutores", appLogin.AutenticaJWT, appAutor.getAllAutores);
routerApp.post("/getAutorByID", appLogin.AutenticaJWT, appAutor.getAutorByID);
routerApp.post("/insertAutor", appLogin.AutenticaJWT, appAutor.insertAutor);
routerApp.post("/updateAutor", appLogin.AutenticaJWT, appAutor.updateAutor);
routerApp.post("/deleteAutor", appLogin.AutenticaJWT, appAutor.deleteAutor);

//Rotas LIVRO
routerApp.get("/getAllLivros", appLogin.AutenticaJWT, appLivro.getAllLivros);
routerApp.post("/getLivroByID", appLogin.AutenticaJWT, appLivro.getLivroByID);
routerApp.post("/insertLivro", appLogin.AutenticaJWT, appLivro.insertLivro);
routerApp.post("/updateLivro", appLogin.AutenticaJWT, appLivro.updateLivro);
routerApp.post("/deleteLivro", appLogin.AutenticaJWT, appLivro.deleteLivro);

//Rotas LEITOR
routerApp.get("/getAllLeitores", appLogin.AutenticaJWT, appLeitor.getAllLeitores);
routerApp.post("/getLeitorByID", appLogin.AutenticaJWT, appLeitor.getLeitorByID);
routerApp.post("/insertLeitor", appLogin.AutenticaJWT, appLeitor.insertLeitor);
routerApp.post("/updateLeitor", appLogin.AutenticaJWT, appLeitor.updateLeitor);
routerApp.post("/deleteLeitor", appLogin.AutenticaJWT, appLeitor.deleteLeitor);

//Rotas EMPRESTIMO
routerApp.get("/getAllEmprestimos", appLogin.AutenticaJWT, appEmprestimos.getAllEmprestimos);
routerApp.post("/getEmprestimoByID", appLogin.AutenticaJWT, appEmprestimos.getEmprestimosByID);
routerApp.post("/insertEmprestimo", appLogin.AutenticaJWT, appEmprestimos.insertEmprestimo);
routerApp.post("/updateEmprestimo", appLogin.AutenticaJWT, appEmprestimos.updateEmprestimo);
routerApp.post("/deleteEmprestimo", appLogin.AutenticaJWT, appEmprestimos.deleteEmprestimo);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;