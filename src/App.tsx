// import logo from "./logo.svg";
import "./App.css";
import MocksDemo from "./MocksDemo";
import CoinsTable from "./components/table/CoinsTable";
import CoinDetails from "./components/CoinDetails";
import FavoriteCoins from "./components/favorites/FavoriteCoins";
import Aggregators from "./components/Aggregators";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import CakeIcon from "@mui/icons-material/Cake";

export default function App() {
  return (
    <div className="App">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          color: "white",
          backgroundColor: "var(--orange-color)",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, marginLeft: "20px" }}
          >
            <CakeIcon sx={{ marginRight: "10px" }} />
            Coincake
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingRight: 0, paddingLeft: "20px" }}>
        <MocksDemo />
        <Grid container sx={{ paddingRight: 0 }}>
          <Grid item xs={9} className={"coin-details"}>
            <Aggregators />
            <Divider />
            <CoinsTable />
          </Grid>
          <Grid item xs={3} sx={{ paddingRight: 0 }}>
            <FavoriteCoins />
            <CoinDetails />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
