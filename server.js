/* eslint-disable no-undef */

const imu = require('node-sense-hat').Imu;
const express = require('express');

const app = express();
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
        error
      });
    }
    console.log(new Date(), ' sending sensor data');
    return res.json(data);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
