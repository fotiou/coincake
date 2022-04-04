import React from "react";
import Box from "@mui/material/Box";

const Amount = (props) => {
	return (
		<Box
			className={"display-flex"}
			style={{ fontWeight: 400, flexDirection: "row-reverse" }}
		>
			${Math.round(props.value).toLocaleString()}
		</Box>
	);
};

export default Amount;
