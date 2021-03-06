const MindBodyApi = require('mindbody-node-client');
const mindBodyApi = new MindBodyApi();

// const mindBodyApi = require('./mindbody.js');

function decode(str) {
  return decodeURIComponent(str.replace(/\+/, '%20'));
}


exports.handler = async (event, context) => {
  console.log('-----------------------');
  console.log('Event Object:');
  console.log(event);
  console.log('-----------------------');

  let response = {
    statusCode: '200',
    body: JSON.stringify({event}),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://btsny.sportngin.com',
    },
  };

  const incomingDataObject = event.body.split('&').reduce((agg, i) => {
    let obj = Object.assign({}, agg);
    const kv = i.split('=');
    obj[kv[0]] = decode(kv[1].replace(/\+/g, '%20'));
    return obj;
  }, {});

  const requestObject = Object.assign({}, incomingDataObject, {
    ReferredBy: 'Other',
    Username: `${decode(incomingDataObject.Email)}`,
    Password: `${Math.random()
      .toString(36)
      .slice(-12)}`,
    BirthDate: decode(incomingDataObject.BirthDate),
    SendEmail: true,
    MiddleName: `${decode(incomingDataObject.HighSchool)} - ${decode(incomingDataObject.GraduationYear)}` // this maps to the field "High School"
  });

  console.log('-----------------------');
  console.log('Request Object:');
  console.log(requestObject);
  console.log('-----------------------');

  const createRequest = await mindBodyApi
    .AddOrUpdateClients(requestObject)
    .catch(e => {
      console.log('oops');
      console.log(e);
    });

  response.body = createRequest;

  console.log('-----------------------');
  console.log('Response Object:');
  console.log(JSON.stringify(createRequest, null, 4));
  console.log('-----------------------');

  context.succeed(response);
};
