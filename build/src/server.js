"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var connection_1 = __importDefault(require("./database/connection"));
var config = require('../knexfile');
var app = express_1.default();
var corsOptions = {
    origin: 'http://needu-frontend.herokuapp.com',
    optionsSuccessStatus: 200
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads')));
var configMigrations = {
    directory: config.migrations.directory,
};
var configSeeds = {
    directory: config.seeds.directory,
};
connection_1.default.migrate
    .latest(configMigrations)
    .then(function () {
    return connection_1.default.seed.run(configSeeds);
})
    .then(function () {
    app.listen(process.env.PORT || 3333);
});
