const TableData = (data) => {
    let inputData = data.data;
    const outputData = inputData.map(element => (
        {key: element.id, toggleText: "toggle", cells: [
            {
                key:'cell-0', id: 'toggle-0', title: element.facility_cd
            },
            {
                key:'cell-1', id: 'toggle-1', title: element.primary_criteria_cd
            }
        ]}
    ));
  return outputData;
};

export default TableData;
