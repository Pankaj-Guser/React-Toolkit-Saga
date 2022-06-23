import React from "react";
import { Header, HeaderCell} from "terra-html-table";

const HeaderComp = (props) => {
    const {headers} = props;

  return (
    <Header>
      {headers && headers.map(header => (
        <HeaderCell key={header.key}>{header.children}</HeaderCell>
      ))}
      <HeaderCell key="action">Actions</HeaderCell>
    </Header>
  );
}

export default HeaderComp;
