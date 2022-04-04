import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Percentage from "../Percentage";
import Amount from "../Amount";

const CoinRow = (props) => {
  const iconUrl = `./images/crypto/icons/${props.coin.id}.png`;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("selected");
  const classes =
    selectedId === props.coin.id ? "selected coin-row" : "coin-row";
  return (
    <Grid
      container
      className={classes}
      onClick={() => props.setSelected(props.coin.id)}
    >
      <Grid item xs={1} className={"coin-details"}>
        <img src={iconUrl} />
      </Grid>
      <Grid item xs={2} className={"coin-details"}>
        {props.coin.name}
      </Grid>
      <Grid item xs={1} className={"coin-details"}>
        {props.coin.symbol}
      </Grid>
      <Grid item xs={2} className={"coin-details"}>
        <Amount value={props.coin.priceUsd} />
      </Grid>
      <Grid item xs={2} className={"coin-details"}>
        <Percentage value={props.coin.changePercent24Hr} />
      </Grid>
      <Grid item xs={3} className={"coin-details"}>
        <Amount value={props.coin.volumeUsd24Hr} />
      </Grid>
      <Grid item xs={1} className={"coin-details"}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            props.handleFavIconClick(props.coin);
          }}
        >
          <StarRateIcon
            sx={{ color: props.coin.isFav ? "var(--selected-star)" : "black" }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CoinRow;
