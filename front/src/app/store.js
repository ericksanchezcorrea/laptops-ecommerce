import { configureStore } from "@reduxjs/toolkit";

import cartSliceReducer from '../features/taskSlices.js'

export  const store = configureStore({
    reducer: 
    {cartStore:cartSliceReducer}
})

