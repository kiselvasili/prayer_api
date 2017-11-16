let express = require('express');
let mongoose = require('mongoose');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');

let databaseConfig = require('./config/database');
let api = require('./app/routes');

let app = express();

mongoose.connect(databaseConfig.url);

app.listen(process.env.PORT || 8080);
console.log('App listening on port 8080');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use('/api', api);

