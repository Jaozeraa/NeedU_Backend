import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

import knex from './database/connection';
import { MigratorConfig, SeederConfig } from 'knex';

const config = require('../knexfile');

const app = express();

app.use(cors({ origin: 'http://https://needu-frontend.herokuapp.com' }));

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

const configMigrations: MigratorConfig = {
  directory: config.migrations.directory,
};

const configSeeds: SeederConfig = {
  directory: config.seeds.directory,
};

knex.migrate
  .latest(configMigrations)
  .then(() => {
    return knex.seed.run(configSeeds);
  })
  .then(() => {
    app.listen(process.env.PORT || 3333);
  });
