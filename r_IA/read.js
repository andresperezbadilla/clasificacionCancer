var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');

    a = 8;
    b = 10;
    c = 10;
    d = 8;
    e = 7;
    f = 10;
    g = 9;
    h = 7;
    i = 1;

    var child_process = require('child_process');
    var cmd = 'Rscript C:\\Users\\Efren\\Desktop\\coloquio\\predict_model.R ' + a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g + " " + h + " " + i;
    var exec = child_process.exec;

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        response=stdout.replace("[1]","").replace("[1]","").split("\r\n");

        if(response[0].trim()==1)
        {
            console.log("benigno");
        }
        else
        {
            console.log("maligno");
        }

        
    });

}).listen(8081);