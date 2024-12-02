import React, { useState, useEffect } from "react";
import EventEmitter from "events";

// Cart item interface
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Singleton state and emitter
const cartItems: CartItem[] = [];
const cartEmitter = new EventEmitter();

// Functions to manage cart
export const addToCart = (product: CartItem) => {
  console.log("CartItem: " + JSON.stringify(product))
  const existingItem = cartItems.find(item => item.id === product.id);
  console.log("Existing item: " +JSON.stringify(existingItem))
  if (existingItem) {
    existingItem.quantity += 1;
    console.log("Existing item changed: " + JSON.stringify(existingItem))
  } else {
    console.log("First time")
    cartItems.push({ ...product, quantity: 1 });
  }
  cartEmitter.emit("cartUpdated", cartItems);
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(cartItems);

  useEffect(() => {
    const listener = (newCartItems: CartItem[]) => { 
        setItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    }
    cartEmitter.on("cartUpdated", listener);

    return () => {
      cartEmitter.off("cartUpdated", listener);  
    };
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');

    if (storedItems) {
        const items = JSON.parse(storedItems)
        setItems(items);
    }
})

  return items;
};
