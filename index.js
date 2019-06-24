
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const path = require('path');
const morgan = require('morgan');
const weatherrouter = require('./routes/weathers');



// defining the Express app
const app = express();

// adding Helmet to enhance your API's security


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// set views directory and handlebars as template engine
app.set('views', path.join(__dirname,"views"));
app.set('view engine','hbs');
app.get('/',weatherrouter)
app.listen(process.env.HTTP_PORT);
// const options = {
//     swaggerDefinition: {
//         // Like the one described here: https://swagger.io/specification/#infoObject
//         openapi: '3.0.0',
//         info: {
//             title: 'WeatherApp API specification',
//             version: '1.0.0',
//             description: 'Specification for WeatherApp Application'
//         },
//         contact: {
//             email: 'emmydee47@gmail.com'
//         },
//         license: {
//             name: 'Apache 2.0'
//         },
//         host: 'localhost:3000',
//         basePath: '/api/v1'
//     },
//     // List of files to be processes. You can also set globs './app/routes/*.js'
//     apis: ['swagger.yaml']
// };

// const specs = swaggerJsdoc(options);
// app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/posts', postRouter);
// app.use('/posts/newsfeed', newsfeedRouter);


// starting the server

module.exports = app;
