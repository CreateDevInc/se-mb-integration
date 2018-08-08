const mindBodyApi = require('./mindbody.js');

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
    obj[kv[0]] = kv[1];
    return obj;
  }, {});

  const requestObject = Object.assign({}, incomingDataObject, {
    ReferredBy: 'Other',
    Username: `${incomingDataObject.Email}`,
    Password: `${Math.random()
      .toString(36)
      .slice(-12)}`,
    BirthDate: decodeURIComponent(incomingDataObject.BirthDate),
    SendEmail: true,
  });

  console.log('-----------------------');
  console.log('Request Object:');
  console.log(requestObject);
  console.log('-----------------------');

  const createRequest = await mindBodyApi
    .createClient(requestObject)
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
