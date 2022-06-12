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
  },
  updateSingleRowData: (rowId, updatedCellData) => {
    console("update data", rowId, updatedCellData)
    return client.table_data_single_row_update.index({
      params: {
        rowId: rowId
      },
      // body: updatedCellData
    })
  },
  addSingleRowData: (addRowData) => {
    return client.table_data_single_row_add.index({
      body: addRowData
    })
  }
}


export default tableApi;
