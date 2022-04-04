import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch } from "react-redux";
import FavoriteCoin from "./FavoriteCoin";
import Divider from "@mui/material/Divider";
import StarRateIcon from "@mui/icons-material/StarRate";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

const FavoriteCoins = (props) => {
  const coins = useSelector((state) => state.coins.value);
  const favs = useSelector((state) => state.favs.value);

  const coinsWithFav = coins.map((coin) => ({
    ...coin,
    isFav: favs.map((fav) => fav.id).includes(coin.id),
  }));

  const dispatch = useDispatch();
  const getFavs = async () => {
    try {
      const responseGet = await axios.get(`favs`);
      dispatch(setByApi(responseGet.data));
    } catch (error) {
      alert(error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [page, setPage] = React.useState(1);
  const pageSize = 3;
  const myFavoriteCoins = coinsWithFav.filter((a) => a.isFav);
  const pages = Math.ceil(myFavoriteCoins.length / pageSize);
  const pagedCoins = myFavoriteCoins.slice(
    page * pageSize - pageSize,
    pageSize * page
  );

  return (
    <Box className={"favorites"}>
      <Box>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          My favorite coins
        </Typography>
        <p>
          Click the <StarRateIcon sx={{ fontSize: "small" }} /> icon to add a
          coin
        </p>
        <p>to your favorites list.</p>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <Divider />
        {myFavoriteCoins.length === 0 && (
          <Box sx={{ margin: "20px 0" }}>
            {" "}
            <p>No items found.</p>
          </Box>
        )}
        {pagedCoins.map((coin, id) => (
          <Box>
            <FavoriteCoin coin={coin} />
            <Divider />
          </Box>
        ))}
      </Box>
      <Box className={"favorites-pagination"}>
        {myFavoriteCoins.length > pageSize && (
          <Pagination count={pages} page={page} onChange={handlePageChange} />
        )}
      </Box>
    </Box>
  );
};

export default FavoriteCoins;
