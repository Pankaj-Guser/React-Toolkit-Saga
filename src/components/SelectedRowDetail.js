import React from "react";
import Grid from "terra-grid";
import Spacer from "terra-spacer";
import Button from "terra-button";
import { useHistory } from "react-router-dom";
import IconPrevious from "terra-icon/lib/icon/IconPrevious";
import Card from "terra-card/lib/Card";
import "./SelectedRowDetails.scss";

function SelectedRowDetails(props) {
  console.log("metadata", props);
  const history = useHistory();
  return (
    <div className="parent-style">
      <Card variant="raised">
        <Spacer
          className="spacerdemoprimary display-flex"
          padding="large small"
          // marginLeft="small"
          isInlineBlock
        >
          <Button
            text="back"
            variant="utility"
            icon={<IconPrevious />}
            onClick={() => history.goBack()}
          />
          <h3>Selected knowledge_basis Details</h3>
        </Spacer>
        <Card.Body>
          <Grid>
            <Grid.Row>
              <Grid.Column
                tiny={12}
                medium={6}
                small={12}
                huge={4}
                enormous={4}
              >
                <label>selected key: {props.location.state[0].key}</label>
              </Grid.Column>
              <Grid.Column
                tiny={12}
                medium={3}
                small={12}
                huge={4}
                enormous={4}
              >
                <label>
                  selected facility_cd: {props.location.state[0].cells[0].title}
                </label>
              </Grid.Column>
              <Grid.Column
                tiny={12}
                medium={3}
                small={12}
                huge={4}
                enormous={4}
              >
                <label>
                  selected primary_criteria_cd:{" "}
                  {props.location.state[0].cells[1].title}
                </label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SelectedRowDetails;
