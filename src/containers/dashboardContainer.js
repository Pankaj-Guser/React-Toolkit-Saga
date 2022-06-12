import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableActions } from "../actions/tableActions";
const TableComp = lazy(() => import("../components/table/table"));

export default function ListTodo() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.TableData);

  useEffect(() => {
    dispatch({ type: tableActions.FETCH_DATA_SAGA });
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TableComp
          tableData={tableData}
        />
      </Suspense>
    </div>
  );
}
