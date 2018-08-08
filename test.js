// const MindBodyApi = require('./mindbody.js');
const MindBodyApi = require('mindbody-node-client');
const mindBodyApi = new MindBodyApi();

const exampleClient = {
  FirstName: 'Jordins',
  LastName: 'Gardner',
  Email: 'garsdsss.josjsssssrdsins%40gmail.com',
  AddressLine1: '123 w 33',
  City: 'sdfsdfsdf',
  State: 'AZ',
  PostalCode: '332233',
  Country: 'US',
  MobilePhone: '4644444444',
  BirthDate: '2011-02-03T07:00:00Z',
  ReferredBy: 'Other',
  Username: 'jjjjjjjjj',
  Password: '123209sdfFFd~d',
};

(async function() {
  // CREATE A CLIENT
  //
  // const createdClient = await mindBodyApi
  //   .createClient(exampleClient)
  //   .catch(e => {
  //     console.log('Something went wrong..');
  //     console.log(e);
  //   });
  // console.log('Client created?');
  // console.log(JSON.stringify(createdClient, null, 4));
  // console.log(createdClient.AddOrUpdateClientsResult.Status);
  // GET A CLIENT
  //
  const client = await mindBodyApi.GetClients().catch(e => {
    console.log('Something went wrong..');
    console.log(e);
  });
  console.log('got a client?');
  console.log(JSON.stringify(client, null, 4));
  // const siteAuthentication = await mindBodyApi.authenticateSite().catch(e => {
  //   console.log('oops');
  //   console.log(e);
  // });
  // console.log(JSON.stringify(siteAuthentication, null, 4));
})();
