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
const { request, response } = require('express');

const DATABASE_HOST='localhost';
const DATABASE_USER='root';
const DATABASE_PASSWORD='root';
const DATABASE_NAME='baza2';

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


app.get('/addPupil/:name/:surname/:pesel/:class', function (request, response) {
    var newPupilQueryValues = "INSERT INTO pupil (pupil_id, name, surname, pesel, class) VALUES (" + Math.random() + ",'"
    + request.params.name + "','" + request.params.surname + "'," + request.params.pesel + ",'" + request.params.class + "');"
    console.log(newPupilQueryValues)
    db.query(newPupilQueryValues , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log("Pupil " + request.params.name + ' ' + request.params.surname + " added succesfully");
        return response.send("Pupil " + request.params.name + ' ' + request.params.surname + " added succesfully");
    });
  });

app.get('/addTeacher/:name/:surname/:pesel/:subject', function (request, response) {
    var newTeacherQueryValues = "INSERT INTO Teacher (teacher_id, name, surname, pesel, subject) VALUES (" + Math.random() + ",'"
    + request.params.name + "','" + request.params.surname + "'," + request.params.pesel + ",'" + request.params.subject + "');"
    console.log(newPupilQueryValues)
    db.query(newPupilQueryValues , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log("Teacher " + request.params.name + ' ' + request.params.surname + " added succesfully");
        return response.send("Teacher " + request.params.name + ' ' + request.params.surname + " added succesfully");
    });
});

app.get('/addSubject/:subject_id/:name', function (request, response) {
    var newSubjectQueryValues = "INSERT INTO Subject (subject_id, name) VALUES (" + Math.random() + ",'"+ request.params.name + "');"
    console.log(newSubjectQueryValues)
    db.query(newSubjectQueryValues , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log("Subject " + request.params.subject_id + ' ' + request.params.name + " added succesfully");
        return response.send("Subject " + request.params.subject_id + ' ' + request.params.name + " added succesfully");
    });
  });

app.get('/addGrade/:pupil_id/:value/:weight', function (request, response) {
    var newSGradeQueryValues = "INSERT INTO Grade (pupil_id,value,weight) VALUES (" + "'" + request.params.pupil_id + "'," + value + "," + weight + ")"
    console.log(newSGradeQueryValues)
    db.query(newSGradeQueryValues , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log("Grade " + request.params.value + " added to " + request.params.pupil_id + " Pupil");
        return response.send("Grade " + request.params.value + " added to " + request.params.pupil_id + " Pupil");
    });
  });

app.get('/removeSubject/:subject_id', (request, response) => {
    let id = request.params.subject_id
    let sql = 'DELETE FROM Subject WHERE subject_id = ?';
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log("subject removed")
        return response.send('Subject removed successfully')
    }) 
})

app.get('/removePupil/:id', (request, response) => {
    let id = request.params.id
    let sql = 'DELETE FROM Pupil WHERE pupil_id = ?';
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log("pupil removed")
        return response.send('Pupil removed successfully')
    }) 
})


app.get('/removeTeacher/:id', (request, response) => {
    let id = request.params.id
    let sql = 'DELETE FROM Teacher WHERE teacher_id = ?';
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log("teacher removed")
        return response.send('Teacher removed successfully')
    }) 
})

app.get('/showAllPupils', (request, response => {
    let sql = 'SELECT * FROM Pupil'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        return result
    }) 
}))

app.get('/showAllSubjects', (request, response => {
    let sql = 'SELECT * FROM Subject'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        return result
    }) 
}))


app.get('/showAllTeacher', (request, response => {
    let sql = 'SELECT * FROM Teacher'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        return result
    }) 
}))

app.get('/showPupil/:id', (request, response => {
    let sql = 'SELECT * FROM Pupil WHERE pupil_id = ?'
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log(result)
        return result
    }) 
}))

app.get('/showSubject/:id', (request, response => {
    let sql = 'SELECT * FROM Subject WHERE subject_id = ?'
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log(result)
        return result
    }) 
}))

app.get('/showTeacher/:id', (request, response => {
    let sql = 'SELECT * FROM Teacher WHERE pupil_id = ?'
    db.query(sql,id, (err, result) => {
        if (err) throw err
        console.log(result)
        return result
    }) 
}))






app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});