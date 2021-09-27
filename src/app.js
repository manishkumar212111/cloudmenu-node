const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');

const dotenv = require('dotenv')
dotenv.config()


const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();



if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// const fileUpload = require('express-fileupload');

// app.use(fileUpload());
var bodyParser = require('body-parser');
const { User } = require('./models');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

app.post('/notifications/subscribe/:id', async (req, res) => {
  const subscription = req.body
  console.log(subscription , req.params)

  await User.findByIdAndUpdate(req.params.id , {
    subscriptionData: JSON.stringify(subscription)
  });
  // const payload = JSON.stringify({
  //   title: 'Hello!',
  //   body: 'It works.',
  // })

  // webpush.sendNotification(subscription, payload)
  //   .then(result => console.log(result))
  //   .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
});


app.use('/uploads', express.static('uploads'));

// v1 api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
