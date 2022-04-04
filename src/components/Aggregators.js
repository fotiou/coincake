import React from "react";
import Grid from "@mui/material/Grid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Aggregator from "./Aggregator";

const Aggregators = () => {
	const coins = useSelector((state) => state.coins.value);
	const items = [
		{
			coins,
			header: "Top Gainers",
			icon: <ArrowDropUpIcon />,
			ascending: true,
			orderBy: "changePercent24Hr",
			itemsCount: 3,
			isPercentage: true,
			headerColor: "var(--up-color)",
		},
		{
			coins,
			header: "Top Loosers",
			icon: <ArrowDropDownIcon />,
			ascending: false,
			orderBy: "changePercent24Hr",
			itemsCount: 3,
			isPercentage: true,
			headerColor: "var(--down-color)",
		},
		{
			coins,
			header: "Biggest Volume (24 hours)",
			icon: <AttachMoneyIcon color={"var(--up-color)"} />,
			ascending: true,
			orderBy: "volumeUsd24Hr",
			itemsCount: 3,
			isPercentage: false,
			headerColor: "var(--up-color)",
		},
	];
	return (
		<Box sx={{ marginBottom: "20px" }}>
			<Grid container spacing={2}>
				{items.map((item, index) => (
					<Grid key={index} item xs={4}>
						<Aggregator {...item} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
export default Aggregators;
