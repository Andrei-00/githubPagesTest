import React, { useState, useEffect } from "react";
import { FC } from "react";
import axios from "axios";
import Product, { Props } from "../components/Product";
import { Box, Grid } from "@mui/material";
import { useProduct } from "../context/productContext";

function Products() {
  // const [products, setProducts] = useState<Props[]>([]);


  // useEffect(() => {
  //   axios.get('data.json')
  //     .then((res) => {
  //       setProducts(res.data["products"])
  //     })
  // }, []);

  const {fetchedProducts} = useProduct();
  const products = fetchedProducts;

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Product {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>

 
    </>
  );
};


export default Products;

