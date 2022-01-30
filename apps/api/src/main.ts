import * as express from 'express';
import * as debug from 'debug';
import * as cors from 'cors';

// import * as fs from 'fs';
import * as expressWinston from 'express-winston';
import * as http from 'http';
import * as https from 'https';
import * as winston from 'winston';
import { CommonRoutesConfig, ROUTES } from './app/routes';

const { SERVER_PORT, HOSTNAME, NODE_ENV } = process.env;

const options = {
  // key: fs.readFileSync('key.pem'),
  // cert: fs.readFileSync('cert.pem'),
};

const app = express();

const server =
  NODE_ENV === 'development'
    ? http.createServer(app)
    : https.createServer(options, app);

const routes: CommonRoutesConfig[] = [];

const debugLog = debug('app');

app.use(express.json());

app.use(cors());

app.use('/assets', express.static(`${__dirname}/assets`));

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(...ROUTES.map((Route) => new Route(app)));

const runningMessage = `Server running at ${HOSTNAME}:${SERVER_PORT}`;

// start the express server
app.get('/', (req, res) => {
  res.status(200).send(runningMessage);
});

server.listen(SERVER_PORT, () => {
  routes.forEach((route) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});
