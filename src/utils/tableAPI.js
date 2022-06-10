import appClient from './appClient';
import routes from './appClient/routes';

let opts = {};
let client = appClient(routes, opts);

const tableApi = {
  updateClient(options = {}, clearCache = false) {
    opts = {
      ...(clearCache ? {} : opts),
      ...options,
    };
    client = appClient(routes, opts);
  },
  fetchData: () => {
    return client.table_data_fetch.index()
  },
  deleteSingleRowData: (rowId) => {
    return client.table_data_single_row_delete.index({
      params: {
        rowId
      }}
    );
  }
}


export default tableApi;
