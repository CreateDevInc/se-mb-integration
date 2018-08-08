const soap = require('soap');

require('dotenv').config();

const siteID = process.env['MB_SITE_ID'];
const sourceName = process.env['MB_SOURCE_NAME'];
const sourcePassword = process.env['MB_SOURCE_PASSWORD'];
const username = process.env['MB_USERNAME'];
const password = process.env['MB_PASSWORD'];

const services = {
  Client: {
    url: 'https://api.mindbodyonline.com/0_5/ClientService.asmx?wsdl',
    endpoint: 'https://api.mindbodyonline.com/0_5/ClientService.asmx',
  },
};

const createSoapClient = (url, endpoint) =>
  new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) reject(err);
      else {
        client.setEndpoint(endpoint);
        resolve(client);
      }
    });
  });

const connectClientService = () =>
  createSoapClient(services.Client.url, services.Client.endpoint);

const SourceCredentials = {
  SourceName: sourceName,
  Password: sourcePassword,
  SiteIDs: {
    int: [siteID],
  },
};

const UserCredentials = {
  Username: username,
  Password: password,
  SiteIDs: {
    int: [siteID],
  },
};

module.exports = {
  async createClient(Client) {
    const client = await connectClientService();

    const params = {
      Request: {
        SourceCredentials,
        UserCredentials,
        Clients: {Client},
      },
    };

    return new Promise((resolve, reject) =>
      client.Client_x0020_Service.Client_x0020_ServiceSoap.AddOrUpdateClients(
        params,
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        },
      ),
    );
  },
  async getClient(data = {}) {
    const client = await connectClientService();

    const params = {
      Request: {
        SourceCredentials,
        UserCredentials,
        SearchText: data.searchText || '',
      },
    };

    return new Promise((resolve, reject) =>
      client.Client_x0020_Service.Client_x0020_ServiceSoap.GetClients(
        params,
        (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        },
      ),
    );
  },
};
