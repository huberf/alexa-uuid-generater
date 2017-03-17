var alexa = require("alexa-app");
var uuid = require('node-uuid');

var weatherApp = new alexa.app('weather');
weatherApp.launch((req, res) => {
  var uuidGen = uuid.v4();
  res.say(`Your generated UUID is ${uuidGen}. Check your Alexa app to view it in print.`);
  res.card('UUID Generator', uuidGen);
});
weatherApp.intent("Generate",
    {
      "slots": [],
    },
    function(req, res) {
      var uuidGen = uuid.v4();
      res.say(`Your generated UUID is ${uuidGen}. Check your Alexa app to view it in print.`);
      res.card('UUID Generator', uuidGen);
    }
);
weatherApp.intent('AMAZON.HelpIntent',
    {},
    (req, res) => {
      res.say('You can use me to retrieve advanced weather data such as precise humidity, windspeed, etc. However, you must specify a city and state with all requests. Try saying humidity in Sacramento California.').shouldEndSession(false).remprompt('I\'m still listening.');
    }
);
weatherApp.intent("AMAZON.StopIntent",
  {
    "slots": [],
  },
  function(request, response) {
    console.log('Stopping skill');
    response.say("Goodbye.");
  }
);
weatherApp.intent("AMAZON.CancelIntent",
  {
    "slots": [],
  },
  function(request, response) {
    console.log('Cancelling skill');
    response.say("Cancelled.");
  }
);

exports.handler = weatherApp.lambda();
