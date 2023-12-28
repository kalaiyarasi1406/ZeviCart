import React from "react";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./ProductSection.css";
import { Link } from "react-router-dom";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";

const Productpage = ({ products, addToCart }) => (
  <Box>
    <Grid container spacing={4}>
      {products.map((id, name, imageURL, price) => (
        <Grid item key={id} xs={12} sm={6} md={4} lg={4} xl={4}>
          <Card>
            {/* price */}
            <Typography paddingLeft={6} style={{ color: "blue" }}>
              ₹ {id.price}
            </Typography>
            <div class="wishlist">
              <Button
                paddingLeft={1}
                onClick={() => addToCart(id, name, price)}
              >
                <Checkbox
                  style={{ color: "red" }}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              </Button>
            </div>

            {/* Image  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "11rem",
                p: 5,
              }}
            >
              <CardMedia
                component="img"
                alt={id.imageURL}
                image={id.imageURL}
                sx={{ maxWidth: "13rem" }}
              />
            </Box>
            <CardActions>
              <Typography paddingLeft={3} style={{ color: "black" }}>
                {id.name}
              </Typography>

              <Link
                to="/"
                style={{ textDecoration: "underline", color: "white" }}
              >
                <div class="product">
                  <p>click here</p>
                  <button class="view-product-btn">View Product</button>
                </div>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Productpage;
