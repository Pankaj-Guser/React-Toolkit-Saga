import React from "react";
import {FormattedMessage} from "react-intl"
import { Header, HeaderCell} from "terra-html-table";

const HeaderComp = (props) => {
    const {headers} = props;

  return (
    <Header>
      {headers && headers.map(header => (
        <HeaderCell key={header.key}>{header.children}</HeaderCell>
      ))}
      <HeaderCell key="action"><FormattedMessage id="app.table.header3" defaultMessage="header3" /></HeaderCell>
    </Header>
  );
}

export default HeaderComp;
