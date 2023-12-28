import React, { Component } from "react"; //Import React Library
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"; // import the specific components from material ui
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; //import icon
import { Link } from "react-router-dom";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

const Header = ({ cartQuantity }) => {
  return (
    <>
      <Toolbar style={{ color: "#a9c9c5" }}>
        <Typography
          paddingLeft={75}
          varient="h6"
          component="h5"
          fontSize={50}
          style={{
            color: "#5c918a",
            fontStyle: "italic",
          }}
        >
          <strong>Zevi Shopping</strong>
        </Typography>
        <div style={{ flexGrow: 1 }} />
      </Toolbar>
    </>
  );
};

export default Header;
