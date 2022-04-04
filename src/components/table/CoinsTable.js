import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CoinRow from "./CoinRow";
import TableHeader from "./TableHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { setByApi, addItem, deleteItemById } from "../../favsSlice";

const CoinsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );
  const [sorting, setSorting] = useState(searchParams.get("sorting") || null);
  const [selected, setSelected] = useState(
    searchParams.get("selected") || "bitcoin"
  );

  useEffect(() => {
    setSearchParams({
      sorting: sorting,
      search: searchText,
      selected: selected,
    });
  }, [searchText, sorting, selected]);

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
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [page, setPage] = React.useState(1);

  const pageSize = 3;
  const pages = Math.ceil(coinsWithFav.length / pageSize);
  const sortedCoins =
    sorting === "ascending"
      ? coinsWithFav.sort((a, b) => a.name.localeCompare(b.name))
      : sorting === "descending"
      ? coinsWithFav.sort((a, b) => b.name.localeCompare(a.name))
      : coinsWithFav;
  const filteredCoins = searchText
    ? sortedCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchText) ||
          coin.symbol.toLowerCase().includes(searchText)
      )
    : sortedCoins;
  const pagedCoins = filteredCoins.slice(
    page * pageSize - pageSize,
    pageSize * page
  );

  return (
    <React.Fragment>
      <FormControl
        sx={{ margin: "20px 1% 0px 0", width: "49%" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          endAdornment={<InputAdornment position="end"></InputAdornment>}
          label="Search"
        />
      </FormControl>
      <FormControl sx={{ margin: "20px 0 0px 1%", width: "49%" }}>
        <InputLabel>Sorting</InputLabel>
        <Select
          value={sorting}
          label="Sorting"
          onChange={(e) => setSorting(e.target.value)}
        >
          <MenuItem value={null}>-</MenuItem>
          <MenuItem value={"ascending"}>A - Z</MenuItem>
          <MenuItem value={"descending"}>Z - A</MenuItem>
        </Select>
      </FormControl>
      <TableHeader />
      {pagedCoins.map((coin, id) => (
        <CoinRow
          key={id}
          coin={coin}
          handleFavIconClick={handleFavIconClick}
          setSelected={setSelected}
        />
      ))}
      <Box className={"coins-pagination"}>
        {coinsWithFav.length > pageSize && (
          <Pagination count={pages} page={page} onChange={handlePageChange} />
        )}
      </Box>
    </React.Fragment>
  );
};

export default CoinsTable;
