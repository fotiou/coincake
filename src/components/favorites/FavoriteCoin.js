import React from "react";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { setByApi, addItem, deleteItemById } from "../../favsSlice";
import Amount from "../Amount";
import Percentage from "../Percentage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FavoriteCoin = (props) => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
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
	const deleteIdFromFavs = async (id) => {
		setOpen(false);
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

	const getIcon = (id) => `./images/crypto/icons/${id}.png`;
	return (
		<Box>
			<Grid
				container
				className={"favorites-coin-row"}
				sx={{ paddingRight: 0 }}
			>
				<Grid item xs={1} className={"favorites-coin-details"}>
					<img
						className={"favorite-coin-icon"}
						src={getIcon(props.coin.id)}
					/>
				</Grid>
				<Grid item xs={3} className={"favorites-coin-details"}>
					{props.coin.name}
				</Grid>
				<Grid item xs={3} className={"favorites-coin-details"}>
					<Amount value={props.coin.priceUsd} />
				</Grid>
				<Grid item xs={3} className={"favorites-coin-details"}>
					<Percentage value={props.coin.changePercent24Hr} />
				</Grid>
				<Grid item xs={2} className={"favorites-coin-details"}>
					<IconButton onClick={() => setOpen(true)}>
						<ClearIcon sx={{ color: "var(--down-color)" }} />
					</IconButton>
				</Grid>
			</Grid>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete from favorites"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete {props.coin.name} from
						your favorites list?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button
						onClick={() => handleFavIconClick(props.coin)}
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default FavoriteCoin;
