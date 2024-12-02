import React from "react";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
// import { useCart, addToCart } from "../helpers/cartStore";
import { useCart, CartItem } from "../context/cartContext";

export interface Props {
    
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
  }

function Product(props: Props) {

    // const cartItems = useCart();
    // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // const handleAddToCart = () => {
    //     console.log("Total items: " + totalItems)
    //     addToCart({ id: props.id, name: props.name, price: props.price, quantity: 1 });
    //   };

    // use context
    const { addToCart } = useCart();

    const cartItem: CartItem = {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: 0
    };


    
    return (
        <div>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {props.category}
                </Typography>
                <Typography variant="h5" component="div">
                     {props.name}
                </Typography>
                <Typography variant="body2">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => addToCart(cartItem)}>Add to Cart</Button>
            </CardActions>
        </div>
    );
};

export default Product;