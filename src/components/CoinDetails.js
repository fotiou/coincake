import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Percentage from "./Percentage";
import Amount from "./Amount";
import axios from "axios";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setByApi, addItem, deleteItemById } from "../favsSlice";

const CoinDetails = (props) => {
	const coins = useSelector((state) => state.coins.value);
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedId = searchParams.get("selected");
	const coinWithoutFav = coins.find((item) => item.id == selectedId);
	const favs = useSelector((state) => state.favs.value);

	if (coins.length == 0) {
		return <></>;
	}

	const coin = {
		...coinWithoutFav,
		isFav: favs.map((fav) => fav.id).includes(coinWithoutFav.id),
	};

	const prevCoin = coins[coins.indexOf(coinWithoutFav) - 1];
	const nextCoin = coins[coins.indexOf(coinWithoutFav) + 1];
	const iconUrl = `./images/crypto/icons/${coin.id}.png`;

	const updateSelectedCoin = (id) => {
		setSearchParams({
			sorting: searchParams.get("sorting"),
			search: searchParams.get("search"),
			selected: id,
		});
	};

	const dispatch = useDispatch();
	const getFavs = async () => {
		try {
			const responseGet = await axios.get(`favs`);
			dispatch(setByApi(responseGet.data));
		} catch (error) {
			alert(error);
		}
	};
	const addIdToFavs = async (id) => {
		try {
			const responseCreate = await axios.post(`favs`, { id });
			dispatch(addItem(responseCreate.data));
		} catch (error) {
			alert(error);
		}
	};
	const deleteIdFromFavs = async (id) => {
		try {
			const responseCreate = await axios.delete(`favs/${id}`);
			dispatch(deleteItemById(id));
		} catch (error) {
			alert(error);
		}
		getFavs();
	};
	const handleFavIconClick = (coin) => {
		coin.isFav ? deleteIdFromFavs(coin.id) : addIdToFavs(coin.id);
	};
	return (
		<Box className={"selected-coin"}>
			<Box className={"display-flex header"}>
				<Box className={"selected-coin-details"}>
					<img src={iconUrl} />{" "}
					<span className={"title"}>{coin.name}</span>
				</Box>
				<Box className={"selected-coin-details row-reverse"}>
					<IconButton onClick={() => handleFavIconClick(coin)}>
						<StarRateIcon
							sx={{
								color: coin.isFav
									? "var(--selected-star)"
									: "black",
							}}
						/>
					</IconButton>
				</Box>
			</Box>
			<Box className={"display-flex"}>
				<Box className={"selected-coin-details"}>
					<span className={"display-flex"}>Price</span>
				</Box>
				<Box className={"selected-coin-details row-reverse"}>
					<Percentage value={coin.changePercent24Hr} />
				</Box>
			</Box>
			<Box className={"display-flex"}>
				<Box className={"selected-coin-details"}>
					<span className={"display-flex"}>Volume</span>
				</Box>
				<Box className={"selected-coin-details row-reverse"}>
					<Amount value={coin.changePercent24Hr} />
				</Box>
			</Box>
			<Box className={"display-flex"}>
				<Box className={"selected-coin-details"}>
					<span className={"display-flex"}>Market Cap</span>
				</Box>
				<Box className={"selected-coin-details"}>
					<Amount value={coin.marketCapUsd} />
				</Box>
			</Box>
			<Box className={"display-flex"}>
				<Box className={"selected-coin-details"}>
					<span className={"display-flex"}>Supply</span>
				</Box>
				<Box className={"selected-coin-details"}>
					<Amount value={coin.supply} />
				</Box>
			</Box>
			<Box item xs={12} className={"selected-coin-details"}>
				<a href={coin.explorer} target="_blank">
					{coin.explorer}
				</a>
			</Box>
			<Box className={"display-flex buttons"}>
				<Box className={"selected-coin-details"}>
					{prevCoin && (
						<>
							<IconButton
								onClick={() => {
									updateSelectedCoin(prevCoin.id);
								}}
							>
								<ArrowBackIosIcon />
							</IconButton>
							<span>{prevCoin.name}</span>
						</>
					)}
				</Box>
				<Box className={"selected-coin-details row-reverse"}>
					{nextCoin && (
						<>
							<IconButton
								onClick={() => {
									updateSelectedCoin(nextCoin.id);
								}}
							>
								<ArrowForwardIosIcon />
							</IconButton>
							<span>{nextCoin.name}</span>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default CoinDetails;
