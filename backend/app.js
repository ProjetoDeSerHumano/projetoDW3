const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const db = require('./database/databaseconfig');

const router = require('./routes/router');
 
const app = express();
const port = 40000;

// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.json());

//@ Utiliza o routerApp configurado em ./routes/route.js
app.use(router);

async function bootstrapDatabase() {
  try {
    const sqlPath = path.resolve(__dirname, './databaseConfig.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await db.query(sql);
    console.log('[DB] bootstrap executed successfully');
  } catch (err) {
    console.error('[DB] bootstrap failed:', err.message);
  }
}

app.listen(port, async () => {
  console.log(`App listening at port ${port}`)
  await bootstrapDatabase();
})

