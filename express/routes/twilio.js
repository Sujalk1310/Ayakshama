const accountSid = "AC80e7aa5d4ddaf98abeb422d64a3b5265";
const authToken = "ed9271315797e73545f498368df62b60";
const client = require('twilio')(accountSid, authToken);

const sendSms = (phone, message) => {
  client.messages
    .create({
       body: message,
       from: "+15185313398",
       to: phone
     })
    .then(message => console.log(message.sid))
    .catch(error => console.error("Error while sending SMS:", error.message));
}

module.exports = sendSms;