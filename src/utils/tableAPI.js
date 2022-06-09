import appClient from './appClient';
import routes from './appClient/routes';

let opts = {};
let client = appClient(routes, opts);

const tableApi = {
  fetchData: () => {
    return client.table_data_fetch.index()
  }
}

  export default tableApi;
