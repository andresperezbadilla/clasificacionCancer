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

/*-------------------------------------------CRUD PACIENTE-----------------------------------*/

//Obtiene los pasientes
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
//obtiene un paciente recibe un objeto {numeroAsegurado: ###}
app.post('/un_paciente',function (req, res, next) {
  data = {numeroAsegurado:req.body.numAsegurado}
  db.one('select * from paciente where codigopaciente = ${numeroAsegurado}',data)
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
//inserta un paciente recibe un objeto {numeroasegurado: 4,nombre:juan ,cedula: 1,edad: 43,direccion: San ramon,telefono:88}
app.post('/insertarPaciente',function (req, res, next) {
  var data = {numeroasegurado:req.body.numAsegurado,nombre:req.body.name,cedula:req.body.cedula,edad:req.body.edad,direccion:req.body.dir,telefono:req.body.tel}
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
//actualiza un paciente recibe un objeto {numeroasegurado: 4,nombre:juan ,cedula: 1,edad: 43,direccion: San ramon,telefono:88}
app.post('/updatePaciente',function(req, res, next) {
  var data = {numeroasegurado:req.body.numAsegurado,nombre:req.body.name,cedula:req.body.cedula,edad:req.body.edad,direccion:req.body.dir,telefono:req.body.tel}
  db.none('update paciente set numeroasegurado=${numeroasegurado}, nombre=${nombre}, cedula=${cedula}, edad=${edad},'+
   'direccion=${direccion}, telefono=${telefono} where numeroasegurado=${numeroasegurado}',
    data)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated paciente'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})
//elimina un paciente recibe un objeto {numeroAsegurado: ##}
app.post('/deletePaciente',function(req, res, next) {
  var numAsegurado = req.body.numAsegurado;
  db.result('delete from paciente where numeroasegurado = $1', numAsegurado)
    .then(function (result) {

      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} paciente`
        });

    })
    .catch(function (err) {
      return next(err);
    });
})


/*-------------------------------------------CRUD Consulta-----------------------------------*/

//Obtiene las consultas
app.get('/obtenerConsultas',function(req, res, next) {
  db.any('select * from consultaclasificacioncancer')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'All consultas'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})
//obtiene una consulta recibe un objeto {id_consulta: ###}
app.post('/una_consulta',function (req, res, next) {
  data = {id_consulta:req.body.id}
  db.one('select * from consultaclasificacioncancer where id_consulta = ${id_consulta}',data)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'la consulta solicitado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})

/*inserta una consulta recibe un objeto
{numeroasegurado:##,grosormasa:##,uniformidadtamaño:##,
    uniformidadforma:##,adhesionmarginal:##,	tamañocelulaepitelial:##,nucleocelula:##
  ,	cromatinablanda:##,nucleolinormal:##,mitosis:##}
*/
app.post('/insertarConsulta',function (req, res, next) {
  var data = {numeroasegurado:req.body.numeroasegurado,grosormasa:req.body.grosormasa,uniformidadtamaño:req.body.uniformidadtamaño,
    uniformidadforma:req.body.uniformidadforma,adhesionmarginal:req.body.adhesionmarginal,	tamañocelulaepitelial:req.body.tamañocelulaepitelial,nucleocelula:req.body.nucleocelula
  ,	cromatinablanda:req.body.cromatinablanda,nucleolinormal:req.body.nucleolinormal,mitosis:req.body.mitosis}
  db.none('insert into consultaclasificacioncancer (numeroasegurado, grosormasa, uniformidadtamaño, uniformidadforma,adhesionmarginal,tamañocelulaepitelial,nucleocelula,'+
  'cromatinablanda,nucleolinormal,mitosis)' +
      ' VALUES(${numeroasegurado}, ${grosormasa}, ${uniformidadtamaño}, ${uniformidadforma},${adhesionmarginal},${tamañocelulaepitelial},${nucleocelula}, ${cromatinablanda}, ${nucleolinormal}, ${mitosis})',
    data)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one consulta'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})
/*actualiza una consulta recibe un objeto
{numeroasegurado:##,grosormasa:##,uniformidadtamaño:##,
    uniformidadforma:##,adhesionmarginal:##,	tamañocelulaepitelial:##,nucleocelula:##
  ,	cromatinablanda:##,nucleolinormal:##,mitosis:##}
*/
app.post('/updatePaciente',function(req, res, next) {
  var data = {numeroasegurado:req.body.numeroasegurado,grosormasa:req.body.grosormasa,uniformidadtamaño:req.body.uniformidadtamaño,
    uniformidadforma:req.body.uniformidadforma,adhesionmarginal:req.body.adhesionmarginal,	tamañocelulaepitelial:req.body.tamañocelulaepitelial,nucleocelula:req.body.nucleocelula
  ,	cromatinablanda:req.body.cromatinablanda,nucleolinormal:req.body.nucleolinormal,mitosis:req.body.mitosis}
  db.none('update consultaclasificacioncancer set numeroasegurado=${numeroasegurado}, grosormasa=${grosormasa}, uniformidadtamaño=${uniformidadtamaño}, uniformidadforma=${uniformidadforma},'+
   'adhesionmarginal=${adhesionmarginal}, tamañocelulaepitelial=${tamañocelulaepitelial}, nucleocelula=${nucleocelula}, cromatinablanda=${cromatinablanda}, nucleolinormal=${nucleolinormal} , mitosis=${mitosis} where numeroasegurado=${numeroasegurado}',
    data)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated consulta'
        });
    })
    .catch(function (err) {
      return next(err);
    });
})
//elimina una consulta recibe un objeto {numeroAsegurado: ##}
app.post('/deletePaciente',function(req, res, next) {
  var numAsegurado = req.body.numAsegurado;
  db.result('delete from consultaclasificacioncancer where numeroasegurado = $1', numAsegurado)
    .then(function (result) {

      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} consulta`
        });

    })
    .catch(function (err) {
      return next(err);
    });
})




app.listen(8080, function(){
		console.log("Running at Port 8080")
	})
