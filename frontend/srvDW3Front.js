var createError = require('http-errors');
var nunjucks = require("nunjucks")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');


const envFilePath = path.resolve(__dirname, './srvDW3Front.env');
require('dotenv').config({ path: envFilePath });

const port = process.env.PORT

//rotas
var rtIndex = require('./routes/rtIndex');
var rtLivros = require('./routes/rtLivros');
var rtConsultarLivros = require('./routes/rtConsultarLivros');
var rtAutores = require('./routes/rtAutores'); 
var rtConsultarAutores = require('./routes/rtConsultarAutores');
var rtLeitores = require('./routes/rtLeitores'); 
var rtConsultarLeitores = require('./routes/rtConsultarLeitores');
var rtEmprestimos = require('./routes/rtEmprestimos'); 
var rtConsultarEmprestimos = require('./routes/rtConsultarEmprestimos');



const sessionSecret = process.env.SECRET_API || 'FallbackKeyParaProducao';
//criação da chavejwt
const jwtchave = process.env.SECRET_API;

var app = express();

var env = nunjucks.configure('apps', {
    autoescape: true,
    express: app,
    watch: true
});

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
app.use('/autores', rtAutores);
app.use('/autores', rtConsultarAutores);
app.use('/leitores', rtLeitores);
app.use('/leitores', rtConsultarLeitores);
app.use('/livros', rtLivros);
app.use('/livros', rtConsultarLivros);
app.use('/emprestimos', rtEmprestimos);
app.use('/emprestimos', rtConsultarEmprestimos);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})