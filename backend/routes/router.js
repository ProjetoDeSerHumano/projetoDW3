const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin.js");
const appAutor = require("../apps/login/controller/ctlAutor.js");
const appLivro = require("../apps/login/controller/ctlLivro.js");
const appEmprestimos = require("../apps/login/controller/ctlEmprestimo.js");

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

//Rotas LIVRO
routerApp.get("/getAllLivros", appLivro.getAllLivros);
routerApp.post("/getLivroByID", appLivro.getLivroByID);
routerApp.post("/insertLivro", appLivro.insertLivro);
routerApp.post("/updateLivro", appLivro.updateLivro);
routerApp.post("/deleteLivro", appLivro.deleteLivro);

//Rotas EMPRESTIMO
routerApp.get("/getAllEmprestimos", appEmprestimos.getAllEmprestimos);
routerApp.post("/getEmprestimoByID", appEmprestimos.getEmprestimosByID);
routerApp.post("/insertEmprestimo", appEmprestimos.insertEmprestimo);
routerApp.post("/updateEmprestimo", appEmprestimos.updateEmprestimo);
routerApp.post("/deleteEmprestimo", appEmprestimos.deleteEmprestimo);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;