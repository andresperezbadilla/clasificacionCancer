var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var promise = require('bluebird');
var cors = require('cors');

app.use(bodyParser.json())

app.use(cors({ origin: 'http://localhost:8101' }));

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgres://andres:12345@localhost:5432/cancer_classification';
//var connectionString = 'postgres://postgres:12345@localhost:5432/cancer_classification';
var db = pgp(connectionString);

/*************************************Funciones Insertar*****************************************/
app.post('/insertarConsulta', function (req, res, next) {
  console.log(req.body)
  db.none('insert into history (grosor_masa, uniformidad_tamano, uniformidad_forma,adhesion_marginal,tamano_celula_epitelial,nucleo_celula, cromatina_blanda,nucleoli,mitosis) ' + 
  ' VALUES (${grosor_masa}, ${uniformidad_tamano}, ${uniformidad_forma},${adhesion_marginal},${tamano_celula_epitelial},${nucleo_celula}, ${cromatina_blanda}, ${nucleoli}, ${mitosis})',
    req.body)
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

app.post('/insertarModelo', function (req, res, next) {
  console.log(req.body)
  db.none('insert into model_history (porcentaje, fecha)  VALUES (${porcentaje}, ${fecha})',
    req.body)
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



/*----------------------------------------Consultas Modelo R-----------------------------------*/

app.get('/actulizar_modelo', function (req, res, next) {
  try {

    var child_process = require('child_process');
    var cmd = 'Rscript C:\\Users\\Efren\\Desktop\\coloquio\\clasificacionCancer\\ApiRestClasificacionCancer\\create_model.R';
    // var cmd = 'Rscript C:/Users/"Andres Steven"/Documents/Ionic/Proyects/clasificacionCancer/ApiRestClasificacionCancer/create_model.R';

    var exec = child_process.exec;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
      res.send(stdout);
    });

  }
  catch (err) {
    console.log(err);
  }
})

app.get('/updatePaciente', function (req, res, next) {

  a = 8;
  b = 10;
  c = 10;
  d = 8;
  e = 7;
  f = 10;
  g = 9;
  h = 7;
  i = 1;

  try {

    var child_process = require('child_process');
    var cmd = 'Rscript C:\\Users\\Efren\\Desktop\\coloquio\\clasificacionCancer\\ApiRestClasificacionCancer\\predict_model.R ' + a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g + " " + h + " " + i;
    //var cmd = 'Rscript C:/Users/Andres Steven/Documents/Ionic/Proyects/clasificacionCancer/ApiRestClasificacionCancer/predict_model.R ' + a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g + " " + h + " " + i;

    var exec = child_process.exec;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
      response = stdout.replace("[1]", "").replace("[1]", "").split("\r\n");

      if (response[0].trim() == 1) {
        res.end('benigno');
      }
      else {
        res.end('maligno');
      }
    });

  }
  catch (err) {
    console.log(err);
  }
})

app.post('/consulta', function (req, res, next) {
  /* a = grosormasa;
   b = uniformidadtamaño;
   c = uniformidadforma;
   d = adhesionmarginal;
   e = tamañocelulaepitelial;
   f = nucleocelula;
   g = cromatinablanda;
   h = nucleolinormal;
   i = mitosis;*/

  a = req.body.grosor_masa;
  b = req.body.uniformidad_tamaño;
  c = req.body.uniformidad_forma;
  d = req.body.adhesion_marginal;
  e = req.body.tamaño_celula_epitelial;
  f = req.body.nucleo_celula;
  g = req.body.cromatina_blanda;
  h = req.body.nucleoli_normal;
  i = req.body.mitosis;

  var child_process = require('child_process');
  var cmd = 'Rscript C:\\Users\\Efren\\Desktop\\coloquio\\clasificacionCancer\\ApiRestClasificacionCancer\\predict_model.R ' + a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g + " " + h + " " + i;

  //var cmd = 'Rscript C:/Users/"Andres Steven"/Documents/Ionic/Proyects/clasificacionCancer/ApiRestClasificacionCancer/predict_model.R ' + a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g + " " + h + " " + i;
  var exec = child_process.exec;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    response = stdout.replace("[1]", "").split("\r\n");
    console.log(response[0].trim().split(" ")[0]);
    if (response[0].trim().split(" ")[0]==1) {
      res.send("benigno");
    }
    else {
      res.send("maligno");
    }
  });



})
/********************************Sector de Pruebas***********************************************/
app.post('/prueba', function (req, res, next) {
  InsertarConsulta(req.body);
  res.send("Se inserto")
})

app.get('/prueba1', function (req, res, next) {

  res.send("18%")
})


app.listen(8080, function () {
  console.log("Running at Port 8080")
})
