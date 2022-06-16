import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableActions } from "../../actions/tableActions";
import Grid from "terra-grid";
import Card from "terra-card/lib/Card";
import "./homeView.scss"
import PolicyTextComp from "../../components/policyText/policyText";
const TableComp = lazy(() => import("../../components/table/tableComp"));

export default function HomeViewComp() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.TableData);

  useEffect(() => {
    dispatch({ type: tableActions.FETCH_DATA_SAGA });
  }, [dispatch]);

  return (
    <div className="parent-style">
      <Grid>
        <Grid.Row>
          <Grid.Column tiny={9} medium={9} small={9} huge={9} enormous={9}>
            <Suspense fallback={<div>Loading...</div>}>
              <Card variant="raised">
                <Card.Body>
                  <TableComp tableData={tableData} />
                </Card.Body>
              </Card>
            </Suspense>
          </Grid.Column>
          <Grid.Column tiny={3} medium={3} small={3} huge={3} enormous={3}>
            <Card variant="raised">
              <Card.Body>
                <PolicyTextComp />
              </Card.Body>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
