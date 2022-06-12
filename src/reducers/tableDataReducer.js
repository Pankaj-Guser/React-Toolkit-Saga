import { tableActions } from "../actions/tableActions";

const DEFAULT_ALLERGIES_STATE = {
  tabledata: [],
  error: "",
};

export const TableData = (state = DEFAULT_ALLERGIES_STATE, action) => {
  switch (action.type) {
    case tableActions.GET_TABLE_DATA_SUCCESS:
      return {
        ...state,
        tabledata: action.payload,
      };
    case tableActions.ADD_ROW:
      return {
        ...state,
        tabledata: action.payload,
      };
    case tableActions.REMOVE_ROW:
      return {
        ...state,
        tabledata: action.payload,
      };
    case tableActions.GET_TABLE_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case tableActions.DELETE_SINGLE_ROW_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case tableActions.UPDATE_SINGLE_ROW_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case tableActions.ADD_SINGLE_ROW_DATA_ERROR:
    return {
      ...state,
      error: action.payload,
    };
      
    default:
      return state;
  }
};