/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const sequelize = require('../database/connection').sequelize;
// console.log(models, sequelize);

const morgan = require('morgan');

const config = require('../config/config');
const userRouter = require('./components/users/route/user');
const postRouter = require('./components/posts/route/post');
const newsfeedRouter = require('./components/posts/route/newsfeed');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        openapi: '3.0.0',
        info: {
            title: 'WeatherApp API specification',
            version: '1.0.0',
            description: 'Specification for WeatherApp Application'
        },
        contact: {
            email: 'emmydee47@gmail.com'
        },
        license: {
            name: 'Apache 2.0'
        },
        host: 'localhost:3000',
        basePath: '/api/v1'
    },
    // List of files to be processes. You can also set globs './app/routes/*.js'
    apis: ['swagger.yaml']
};

const specs = swaggerJsdoc(options);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/posts/newsfeed', newsfeedRouter);

sequelize.sync(
    {
       // force: true,
        logging: console.log
    },
    app.listen(config.httpPort, () => {
        console.log(
            'Server listening on port ' +
                config.httpPort +
                ' and ' +
                config.envName +
                ' environment'
        );
    })
);
// starting the server

module.exports = app;
