const mindBodyApi = require('./mindbody.js');

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
  // const createdClient = await mindBodyApi.createClient(client).catch(e => {
  //   console.log('Something went wrong..');
  //   console.log(e);
  // });
  const client = await mindBodyApi
    .getClient({searchText: 'Jordins'})
    .catch(e => {
      console.log('Something went wrong..');
      console.log(e);
    });

  console.log('got a client?');
  console.log(JSON.stringify(client, null, 4));

  // console.log('Client created?');
  // console.log(JSON.stringify(createdClient, null, 4));
  // console.log(createdClient.AddOrUpdateClientsResult.Status);
})();
