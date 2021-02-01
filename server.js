/* eslint-disable no-undef */

const express = require('express');
const senseLeds = require('sense-hat-led');
const imu = require('node-sense-hat').Imu;

const app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3001);

const IMU = new imu.IMU();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/weather', (req, res) => {
  //   const param = req.query.q;

  IMU.getValue((error, data) => {
    if (error !== null) {
      console.error('Could not read sensor data: ', error);
      return res.json({
        msg: 'Could not read sensor data',
        error,
      });
    }
    console.log(new Date(), ' sending sensor data');
    return res.json(data);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

// LED MESSAGE:
let message = 'Hello World!';
if (senseLeds) {
  startShowMessage();
}
function startShowMessage() {
  senseLeds.showMessage(` ${message} `, 0.1, [255, 0, 0], startShowMessage);
}

app.get('/api/message', (req, res) => res.json({ message }));
app.post('/api/message', (req, res) => {
  console.log(new Date(), ` setting message ${req.body?.message}`);
  message = req.body?.message || message;
  res.sendStatus(200);
});
