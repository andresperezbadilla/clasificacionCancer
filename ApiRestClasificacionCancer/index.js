var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var promise = require('bluebird');
var cors = require('cors');

app.use(bodyParser.json())

app.use(cors({ origin: 'http://localhost:8100' }));

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

//var connectionString = 'postgres://andres:12345@localhost:5432/cancer_classification';
var connectionString = 'postgres://postgres:12345@localhost:5432/cancer_classification';
var db = pgp(connectionString);

/*-------------------------------------------CRUD PACIENTE-----------------------------------*/

//Obtiene los pasientes
app.get('/obtenerPacientes', function (req, res, next) {
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
app.post('/un_paciente', function (req, res, next) {
  //data = { numero_segurado: req.body.num_asegurado }
  db.one('select * from paciente where codigopaciente = ${numero_segurado}', req.body)
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
app.post('/insertarPaciente', function (req, res, next) {
  //var data = { numero_asegurado: req.body.num_asegurado, nombre: req.body.name, cedula: req.body.cedula, edad: req.body.edad, direccion: req.body.dir, telefono: req.body.tel }
  db.none('insert into paciente (numero_asegurado, nombre, cedula, edad,direccion,telefono)' +
    ' VALUES(${numero_asegurado}, ${nombre}, ${cedula}, ${edad},${direccion},${telefono})',
    req.body)
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
app.post('/updatePaciente', function (req, res, next) {
  //var data = { numero_asegurado: req.body.num_asegurado, nombre: req.body.name, cedula: req.body.cedula, edad: req.body.edad, direccion: req.body.dir, telefono: req.body.tel }
  db.none('update paciente set numero_asegurado=${numero_asegurado}, nombre=${nombre}, cedula=${cedula}, edad=${edad},' +
    'direccion=${direccion}, telefono=${telefono} where numero_asegurado=${numero_asegurado}',
    req.body)
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
app.post('/deletePaciente', function (req, res, next) {
  //var num_asegurado = req.body.num_asegurado;
  db.result('delete from paciente where numero_asegurado = $1', req.body)
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
app.get('/obtenerConsultas', function (req, res, next) {
  db.any('select * from history')
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
app.post('/una_consulta', function (req, res, next) {

  db.one('select * from history where id_consulta = ${id_consulta}', req.body)
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
app.post('/insertarConsulta', function (req, res, next) {

  db.none('insert into history (numero_asegurado, grosormasa, uniformidad_tamaño, uniformidad_forma,adhesion_marginal,tamaño_celula_epitelial,nucleo_celula,' +
    'cromatina_blanda,nucleoli_normal,mitosis)' +
    ' VALUES(${numero_asegurado}, ${grosormasa}, ${uniformidad_tamaño}, ${uniformidad_forma},${adhesion_marginal},${tamaño_celula_epitelial},${nucleo_celula}, ${cromatina_blanda}, ${nucleoli_normal}, ${mitosis})',
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
/*actualiza una consulta recibe un objeto
{numeroasegurado:##,grosormasa:##,uniformidadtamaño:##,
    uniformidadforma:##,adhesionmarginal:##,	tamañocelulaepitelial:##,nucleocelula:##
  ,	cromatinablanda:##,nucleolinormal:##,mitosis:##}

app.get('/updatePaciente', function (req, res, next) {
*/

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
      res.end(stdout);
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
      res.end("benigno");
    }
    else {
      res.end("maligno");
    }
  });



})
//elimina una consulta recibe un objeto {numeroAsegurado: ##}
app.post('/deletePaciente', function (req, res, next) {
  //var numAsegurado = req.body.numAsegurado;
  db.result('delete from history where numero_asegurado = $1', req.body)
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

app.post('/prueba', function (req, res, next) {
  
  res.send("recibido con ")
})

app.get('/prueba1', function (req, res, next) {

  res.send("18%")
})


app.listen(8080, function () {
  console.log("Running at Port 8080")
})
