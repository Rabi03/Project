import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

export default function PostCollapse({ expanded, body }) {
  return (
    <Collapse in={expanded} timeout='auto' unmountOnExit>
      <Typography paragraph style={{ color: "white" }}>
        {body}
      </Typography>
    </Collapse>
  );
}
