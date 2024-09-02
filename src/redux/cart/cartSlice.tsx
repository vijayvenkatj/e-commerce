import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCartItem, fetchCart } from "./cartActions";

const initialState: cart = {
    items: [],
    isloading: false,
    error: ''
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem:(state,action)=>{
            const existing = state.items.find((item)=>item.id == action.payload.id);
            if(existing){
                existing.quantity+=1
            }
            else{
                state.items.push({...action.payload})
            }
        },
        removeItem:(state,action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload.id)
        },
        clearCart:(state,action)=>{
            state.items = initialState.items
        },
        updateQuantity:(state,action)=>{
            const existing = state.items.find((item)=>item.id == action.payload.id);
            if(existing){
                existing.quantity= action.payload.quantity
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCart.pending,(state)=>{
            state.isloading = true,
            state.error = null
        }),
        builder.addCase(fetchCart.fulfilled,(state,action: any)=>{
            state.isloading = false,
            state.items = action.payload
        }),
        builder.addCase(fetchCart.rejected,(state,action)=>{
            state.isloading = false,
            state.error = action.error as string || "Error fetching details"
        }),
        builder.addCase(addCartItem.pending,(state)=>{
            state.isloading = true,
            state.error = null
        }),
        builder.addCase(addCartItem.fulfilled,(state,action: any)=>{
            state.isloading = false,
            state.items = {...action.payload}
        }),
        builder.addCase(addCartItem.rejected,(state,action)=>{
            state.isloading = false,
            state.error = action.error as string || "Error fetching details"
        })
    }
})

export const {addItem,removeItem,clearCart,updateQuantity} = cartSlice.actions
export default cartSlice.reducer;


interface cartItem{
    id?: number,
    product: string,
    image: string,
    quantity: string,
    price: string
}
interface cart{
    items: cartItem[],
    isloading: boolean,
    error: string | null
}