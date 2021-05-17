import React from "react";
import styled from "styled-components";

const ToolTipText = styled("span")({
  visibility: "hidden",
  width: "120px",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 0",
  position: "absolute",
  zIndex: 1,
  top: "-16px",
  left: "120%",
  //   bottom: "150%",
  //   left: "50%",
  //   marginLeft: "-60px",
//   ":after": {
//     content: '""',
//     position: "absolute",
    // marginLeft: "55px",
    // borderWidth: "5px",
    // borderStyle: "solid",
    // borderColor: "black transparent transparent transparent"
//   }
});

const ToolTip = styled("div")({
  position: "relative",
  display: "inline-block",
  ":hover span": {
    visibility: "visible"
  }
});

const TipInfo = ({ children, toolTipText }) => (
  <ToolTip>
    {children}
    <ToolTipText>{toolTipText}</ToolTipText>
  </ToolTip>
);

export default TipInfo;
