import React from "react";
import StarRateIcon from '@mui/icons-material/StarRate';
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const CoinDetails = (props) => {
	const coins = useSelector((state) => state.coins.value);
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedId = searchParams.get('selected');
	const coin = coins.find(item=> item.id == selectedId);
	if(coins.length==0) {
		return<></>;
	}
	const iconUrl = `./images/crypto/icons/${coin.id}.png`;
	return (
		<Grid container className={"coin-row selected-coin"} direction="column">
			<Grid item xs={1} className={"coin-details"}>
				<img src={iconUrl} />
			</Grid>
			<Grid item xs={2} className={"coin-details"}>
				{coin.name}
			</Grid>
			<Grid item xs={3} className={"coin-details"}>
				{coin.priceUsd}
			</Grid>
			<Grid item xs={4} className={"coin-details"}>
				{coin.volumeUsd24Hr}
			</Grid>
			<Grid item xs={2} className={"coin-details"}>
				<StarRateIcon
					sx={{ color: coin.isFav ? "var(--selected-star)" : "black" }}
					// onClick={() => props.handleFavIconClick(coin)}
				/>
			</Grid>
		</Grid>
	);
};

export default CoinDetails;
