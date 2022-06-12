const routes = {
  table_data_fetch: {
    index: {
      description: 'Table Data Fetch',
      url: 'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis',
      method: 'GET'
    }
  },
  table_data_single_row_delete: {
    index: {
      description: 'Delete Single Row',
      url: 'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis/{rowId}',
      method: 'DELETE'
    }
  },
  table_data_single_row_add: {
    index: {
      description: 'Add Single Row',
      url: 'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis',
      method: 'POST'
    }
  },
  table_data_single_row_update: {
    index: {
      description: 'Update Single Row',
      url: 'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis/{rowId}',
      method: 'PUT'
    }
  },
};

export default routes;
