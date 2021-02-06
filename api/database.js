const loki = require('lokijs');

const IS_PROD = process.env.NODE_ENV === 'production';

const db = new loki(IS_PROD ? 'myDatabase.db' : 'devDatabase.db', {
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});
let messages;
let initCallback = () => {};

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  messages = db.getCollection("messages");
  if (messages === null) {
    messages = db.addCollection("messages");
  }

  // kick off any program logic or start listening to external events
  runProgramLogic();
}

// example method with any bootstrap logic to run after database initialized
function runProgramLogic() {
  console.log(`Number of messages in database : ${messages.count()}`);
  console.log(`Newest message: ${getMessage()}`);
  initCallback();
}

const addMessage = message => messages.insert(message);

const getMessage = () => messages.where(() => true)[0]?.message;

module.exports = {
  init: cb => initCallback = cb,
  addMessage,
  getMessage,
}
