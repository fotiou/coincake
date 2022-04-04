import React from "react";
import Grid from "@mui/material/Grid";

const TableHeader = () => {
  return (
    <Grid
      container
      className={"coins-table-header"}
      onClick={() => props.setSelected(props.coin.id)}
    >
      <Grid item xs={1} className={"coin-details"}>     
      </Grid>
      <Grid item xs={2} className={"coin-details"}>
        Name
      </Grid>
      <Grid item xs={1} className={"coin-details"}>
        Symbol
      </Grid>
      <Grid item xs={2} className={"coin-details"}>
        Price 
      </Grid>
      <Grid item xs={2} className={"coin-details"}>
        Change
      </Grid>
      <Grid item xs={3} className={"coin-details"}>
        Volume
      </Grid>
      <Grid item xs={1} className={"coin-details"}>
      </Grid>
    </Grid>
  );
};

export default TableHeader;
