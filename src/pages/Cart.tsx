import React from "react";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { CartItem, useCart } from "../context/cartContext";
import { Typography, MenuItem } from "@mui/material";


function renderRow(props: ListChildComponentProps) {
  const { index, style} = props;

  const items: CartItem[] = props.data;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${JSON.stringify(items[index].name)}`} />
      </ListItemButton>
    </ListItem>
  );
}


function Cart() {
  
  
  const { cartItems, addToCart, removeFromCart, clearCart}  = useCart();

  //const cartItems = useCart();
  const numberOfUniqueItems = cartItems.reduce((acc, item) => acc + 1, 0);
  const totalSumPrice = cartItems.reduce((acc, item)=> acc + item.price * item.quantity, 0);


    return (
        <Box
        sx={{ width: '100%', height: 400, maxWidth: 700, bgcolor: 'background.paper' }}
      >
        <FixedSizeList
          height={400}
          width={700}
          itemSize={46}
          itemCount={numberOfUniqueItems}
          overscanCount={5}
          itemData={cartItems}
        >
          {renderRow}
        </FixedSizeList>
        <Typography>Total: {totalSumPrice}$</Typography>
        <MenuItem>
          Proceed to Checkout
        </MenuItem>
      </Box>
    );
};

export default Cart;