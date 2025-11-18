const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
/*
const appContas = require("../apps/contas/controller/ctlContas"); 
const appTransacoes = require("../apps/transacoes/controller/ctlTransacoes"); 
*/
// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Teste para o Sistema de Biblioteca.");
});
/*
// Rotas de Transações (Serão acessadas via /transacoes/UpdateTransacoes)
routerApp.get("/GetAllTransacoes", appLogin.AutenticaJWT, appTransacoes.GetAllTransacoes);
routerApp.post("/GetTransacaoByID", appLogin.AutenticaJWT, appTransacoes.GetTransacaoByID);
routerApp.post("/InsertTransacoes", appLogin.AutenticaJWT, appTransacoes.InsertTransacoes);
routerApp.post("/UpdateTransacoes", appLogin.AutenticaJWT, appTransacoes.UpdateTransacoes);
routerApp.post("/DeleteTransacoes", appLogin.AutenticaJWT, appTransacoes.DeleteTransacoes);

// Rotas de Contas (Serão acessadas via /contas/UpdateContas, dependendo de onde você importa)
routerApp.get("/GetAllContas", appLogin.AutenticaJWT, appContas.GetAllContas);
routerApp.post("/GetContaByID", appLogin.AutenticaJWT, appContas.GetContaByID);
routerApp.post("/InsertContas", appLogin.AutenticaJWT, appContas.InsertContas);
routerApp.post("/UpdateContas", appLogin.AutenticaJWT, appContas.UpdateContas);
routerApp.post("/DeleteContas", appLogin.AutenticaJWT, appContas.DeleteContas);
*/
// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;