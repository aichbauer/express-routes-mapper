import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import routes from './config/routes';
import mapRoutes from '../../lib';

const app = express();
const server = http.Server(app);
const port = 3338;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', mapRoutes(routes, 'app/controllers/'));

server.listen(port, () => {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});
