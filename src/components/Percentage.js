import React from "react";
import Box from "@mui/material/Box";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Percentage = (props) => {
	const color = props.value >= 0 ? "var(--up-color)" : "var(--down-color)";
	return (
		<Box style={{ color: color }} className={"display-flex"}>
			{props.value >= 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
			{Math.round(props.value * 100) / 100}%
		</Box>
	);
};

export default Percentage;
