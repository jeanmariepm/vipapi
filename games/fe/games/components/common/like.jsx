import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <React.Fragment>
      <i
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      />
    </React.Fragment>
  );
};

export default Like;
