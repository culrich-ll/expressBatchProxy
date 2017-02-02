var cluster = require('cluster');

if (cluster.isMaster)
{
  console.log('Server is active. Forking workers now.');
  var cpuCount = require('os').cpus().length;
  for (var i=0; i<cpuCount; i++)
  {
    cluster.fork();
  }
  cluster.on('exit', function(worker)
  {
    console.error('Worker %s has died! Creating a new one.', worker.id);
    cluster.fork();
  });
}
else {
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const port = process.env.PORT || 8090;
  const api = require('./routes/api');
  const config = require('./config/config');
  const batchProxy = require('./batch-proxy');

  // Handle body
  app.use(bodyParser.json());

  app.get("/", api.getalluser);
  app.get('/user/:id', api.getuser);
  app.post('/user', api.createuser);
  app.put('/user/:id', api.changeuser);
  app.delete('/user/:id', api.deletuser);
  app.get("/start", api.startJDLgeneration);
  app.post('/batch', batchProxy(port, 'localhost'));

  app.listen(port, function () {
    console.log('Worker %s spawned for port %s.', cluster.worker.id, port);
  });

  // Expose
  exports = module.exports = app;

}