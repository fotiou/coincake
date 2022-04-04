import React from "react";
import Box from "@mui/material/Box";
import Percentage from "./Percentage";
import Amount from "./Amount";

const Aggregator = (props) => {
	const compare = (a, b) =>
		props.ascending
			? b[props.orderBy] - a[props.orderBy]
			: a[props.orderBy] - b[props.orderBy];
	const filteredCoins = [...props.coins]
		.sort(compare)
		.slice(0, props.itemsCount);
	const getIcon = (id) => `./images/crypto/icons/${id}.png`;

	return (
		<Box className="aggregator">
			<h4 className={"display-flex"} style={{ color: props.headerColor }}>
				{props.icon} {props.header}
			</h4>
			{filteredCoins.map((coin, index) => (
				<Box key={index} className={"display-flex"}>
					<Box className={"align-items-center left"}>
						<span className={"index"}>{index + 1}</span>
						<img
							src={getIcon(coin.id)}
							className={"coin-icon"}
						/>{" "}
						<span className={"coin-name"}>{coin.name}</span>{" "}
						<span className={"coin-symbol"}>{coin.symbol}</span>
					</Box>
					<Box className={"percentage align-items-center right"}>
						{props.isPercentage ? (
							<Percentage value={coin[props.orderBy]} />
						) : (
							<Amount value={coin[props.orderBy]} />
						)}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Aggregator;
