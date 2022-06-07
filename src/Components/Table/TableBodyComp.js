// import React from "react";
// import "./table.scss";

// export default function TableBodyComp(props) {

//   const {
//     tableData,
//     removeTableRow
//   } = props;
//   function ConfirmBox() {
//     return (
//       <>
//         {tableData.length > 1
//           ? alert("are you sure! You want to remove it")
//           : alert("list is going to be empty! are you sure you want to do ths")}
//       </>
//     );
//   }

//   function RemoveElement(index) {
//     tableData.splice(index, 1);
//     ConfirmBox();
//     removeTableRow(tableData);
//   }
  
//   return (
//     <tbody className="table-body" key="tableBody">
//       {tableData !== undefined && tableData.length > 0 ? (
//         tableData.map((data, index) => (
//           <tr className="table-row" key={index}>
//             {data.map((rowData, key) => (
//               <td className="table-cell" key={`rowData${key}`}>
//                 {rowData}
//               </td>
//             ))}
//             <button
//               type="button"
//               className="btn btn-link"
//               key={`removeButton${index}`}
//               onClick={(e) => RemoveElement(index)}
//             >
//               Remove
//             </button>
//           </tr>
//         ))
//       ) : (
//         <div className="error-msg-style">No Record in Table</div>
//       )}
//     </tbody>
//   );
// }

