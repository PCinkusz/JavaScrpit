// STWORZENIE SERWERA RESTOWEGO W EXPRESS.JS
const mysql = require('mysql');
let express = require("express");
const fs = require("fs-extra");
let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // wsparcie przesyłania plików json
app.use(bodyParser.urlencoded({ extended: true }));
// DEKLARACJA BIBLIOTEKI ODPOWIEDZIALNEJ ZA ODCZYT / ZAPIS DANYCH DO PLIKU

// DEKLARACJA ZMIENNEJ ODPOWIEDZIALNEJ ZA RÓZNE FUNKCJE POMOCNICZE
let lodash = require("lodash");
var easyinvoice = require('easyinvoice');
const FileSaver = require('file-saver');

const DATABASE_HOST='localhost';
const DATABASE_USER='root';
const DATABASE_PASSWORD='root';
const DATABASE_NAME='baza';

const db = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
})


db.connect((err) => {
    if(err){
        throw err
    }
    console.log('MySql connected')
})


app.get('/showEventById/:id', (request, response) => {
    let id = request.params.id
    let sql = 'Select * from event where idEvent = ' +  mysql.escape(id)
    db.query(sql, (err, result) => {
        if (err) throw err
        response.send(response)
    }) 
})