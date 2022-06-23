const mockData = {
  tableHeaderMockData: [
    { key: "cell-0", id: "toggle-0", children: "Facility" },
    { key: "cell-1", id: "toggle-1", children: "Primary Criteria" },
    // { key: "cell-2", id: "toggle-2", children: "facility_cd" },
    // { key: "cell-3", id: "toggle-3", children: "primary_criteria_cd" },
  ],
  tableBodyMockData: [
    {
      key: "0",
      toggleText: "toggle",
      cells: [
        { key: "cell-0", id: "toggle-0", title: "Name" },
        { key: "cell-1", id: "toggle-1", title: "Address" },
        { key: "cell-2", id: "toggle-2", title: "Phone Number" },
        { key: "cell-3", id: "toggle-3", title: "Email Id" },
      ],
    },
    {
      key: "1",
      toggleText: "toggle",
      cells: [
        { key: "cell-1-0", id: "toggle-0", title: "Name" },
        { key: "cell-1-1", id: "toggle-1", title: "Address" },
        { key: "cell-1-2", id: "toggle-2", title: "Phone Number" },
        { key: "cell-1-3", id: "toggle-3", title: "Email Id" },
      ],
    },
  ],
};
export default mockData;
