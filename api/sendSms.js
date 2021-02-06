const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

module.exports = message => client.messages
  .create({
     body: `New Message: ${message} . From eSantini.com`,
     from: config.twilio.fromNumber,
     to: config.twilio.phoneNumber
   })
  .then(message => console.log(`Sent SMS: ${message.sid}`))
  .catch(err => console.log({err}));
