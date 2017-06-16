var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://andres:12345@localhost:5432/clasificacion_cancer';
var db = pgp(connectionString);


app.get('/obtenerPacientes',function(req, res, next) {
    console.log('here')
  db.any('select * from paciente')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'All pacientes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})

app.get('/un_paciente',function (req, res, next) {
  
  db.one('select * from paciente where codigopaciente = 1')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'El paciente solicitado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})

app.get('/insertarPaciente',function (req, res, next) {
  var data = {numeroasegurado:2,nombre:'pablo',cedula:'21-4',edad:14,direccion:'tec',telefono:'88-12'}
  db.none('insert into paciente (numeroasegurado, nombre, cedula, edad,direccion,telefono)' +
      ' VALUES(${numeroasegurado}, ${nombre}, ${cedula}, ${edad},${direccion},${telefono})',
    data)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one paciente'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})

app.get('/updatePaciente',function(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})


app.listen(8080, function(){
		console.log("Running at Port 8080")
	})
