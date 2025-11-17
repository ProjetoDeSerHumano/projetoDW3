// ARQUIVO: srvDW3Front.js (Versão Final Corrigida)

var createError = require('http-errors');
var nunjucks = require("nunjucks")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');


const envFilePath = path.resolve(__dirname, './srvDW3Front.env');
require('dotenv').config({ path: envFilePath });

const port = process.env.PORT
var rtIndex = require('./routes/rtIndex');
/*
// ADAPTAÇÕES DE ROTAS
var rtTransacoes = require('./routes/rtTransacoes'); 
var rtContas = require('./routes/rtContas'); 
*/

// --- CORREÇÃO DO ERRO DE SESSÃO: DEFINIR O SECRET DE FORMA ROBUSTA ---
// A variável SECRET_API deve ser definida no seu srvDW3Front.env. 
// Usamos um fallback caso o .env não seja carregado a tempo ou esteja vazio.
const sessionSecret = process.env.SECRET_API || 'FallbackKeyParaProducao';

// A variável jwtchave não é necessária aqui, mas se for usada em algum lugar:
const jwtchave = process.env.SECRET_API;
// -----------------------------------------------------------------------


var app = express();


// --- FUNÇÃO DE FILTRO NUNJUCKS PARA MOEDA ---
function formatarMoeda(value) {
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)))) {
        const numericValue = parseFloat(value);
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(numericValue);
    }
    return value;
}
// ------------------------------------------------------------------


// CONFIGURAÇÃO NUNJUCKS
var env = nunjucks.configure('apps', {
    autoescape: true,
    express: app,
    watch: true
});

// REGISTRA O FILTRO DE MOEDA
env.addFilter('currencyFormat', formatarMoeda);


app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// USO DA SESSÃO COM O SECRET GARANTIDO
app.use(
    session({
        secret: sessionSecret, // AGORA GARANTIDO QUE NÃO É NULL/UNDEFINED
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: null },
    })
);


//@ ROTEAMENTO ADAPTADO
app.use('/', rtIndex);
/*
app.use('/transacoes', rtTransacoes);
app.use('/contas', rtContas);
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})