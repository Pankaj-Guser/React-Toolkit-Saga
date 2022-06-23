import { ActionsConstant } from "../actions/ActionsConstant";

const DEFAULT_ALLERGIES_STATE = {
  tabledata: [],
  error: "",
};

export const TableData = (state = DEFAULT_ALLERGIES_STATE, action) => {
  switch (action.type) {
    case ActionsConstant.GET_TABLE_DATA_SUCCESS:
      return {
        ...state,
        tabledata: action.payload,
      };
    case ActionsConstant.ADD_ROW:
      return {
        ...state,
        tabledata: action.payload,
      };
    case ActionsConstant.REMOVE_ROW:
      return {
        ...state,
        tabledata: action.payload,
      };
    case ActionsConstant.GET_TABLE_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionsConstant.DELETE_SINGLE_ROW_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionsConstant.UPDATE_SINGLE_ROW_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionsConstant.ADD_SINGLE_ROW_DATA_ERROR:
    return {
      ...state,
      error: action.payload,
    };
    case ActionsConstant.SET_SELECTED_CELL_KEY:
    return {
      ...state,
      selectedCellKey: action.payload[0].key,
      cell1InputData: action.payload[0].cells[0].title,
      cell2InputData: action.payload[0].cells[1].title 

    };
    case ActionsConstant.GET_POLICY_TEXT_SUCCESS:
      return {
        ...state,
        policyText: action.payload,
      };
    case ActionsConstant.GET_POLICY_TEXT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};