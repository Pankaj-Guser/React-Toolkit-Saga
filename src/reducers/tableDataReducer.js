import { tableActions }  from '../actions/tableActions';

const DEFAULT_ALLERGIES_STATE = {
  tabledata: []
};


export const TableData = (state = DEFAULT_ALLERGIES_STATE, action) => {
  

  switch (action.type) {

    case tableActions.GET_TABLE_DATA:
      return {
        ...state,
        tabledata: action.payload
      };
    case tableActions.ADD_ROW:
      return {
        ...state,
        tabledata: action.payload
      };
    case tableActions.REMOVE_ROW:
      return {
        ...state,
        tabledata: action.payload
      }
    default:
      return state;
  }
};