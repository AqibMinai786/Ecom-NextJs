import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// for single product structure
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// for products in cart
interface CartState {
  items: Product[];
}

// making CartState as initial state
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
        // if (!state.items.some(item => item.id === action.payload.id)) {
        //     state.items.push(action.payload);
        //   }
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (!existingItem) {
          state.items.push({ ...action.payload, quantity: 1 }); // ✅ Set quantity to 1
        }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      else if(item && item.quantity == 1){
        
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
