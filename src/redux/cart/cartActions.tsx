import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const cart = await axios({
      url: `/api/cart/all`,
      method: "post",
    });
    return cart.data as cartItem[];
  } catch (error) {
    console.log("Error fetching cartItems", error);
    return error as string;
  }
});

export const addCartItem = createAsyncThunk('cart/addCartItem', async (Item: cartItem, thunkAPI) => {
  try {
    const cart = await axios({
      url: `${BASE_URL}/api/cart/addItem`,
      method: "post",
      data: {
        product: Item.product,
        image: Item.image,
        quantity: Item.quantity,
        price: Item.price,
      },
    });
    if (cart) {
      return Item;
    }
  } catch (error) {
    console.log("Error adding cartItems", error);
    return error;
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, func }: { id: number; func: string }, thunkAPI) => {
  try {
    const cart = await axios({
      url: `${BASE_URL}/api/cart/${func}Quantity`,
      method: "post",
      data: {
        id,
      },
    });
    if (cart) {
      return cart;
    }
  } catch (error) {
    console.log("Error updating cartItems", error);
    return error;
  }
});

interface cartItem {
  id?: number;
  product: string;
  image: string;
  quantity?: string;
  price: string;
}
