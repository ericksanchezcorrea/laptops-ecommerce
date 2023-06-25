import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    laptops:[],
    isLoading: true,
    isAuthenticated:false,
    user:null,
    cart: JSON.parse(localStorage.getItem('cart')) || []
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        
        //*********** USER
        saveUser:(state, action)=>{
            return{
                ...state,
                user: action.payload
            }
        },
        deleteUser:(state, action)=>{
            return{
                ...state,
                user: null
            }
        },

        //***********isLoading
        setIsLoading:(state, action)=>{
            return{
                ...state,
                isLoading: action.payload
            }
        },

        


        //***********lista de laptops
        GuardarLista:(state, action)=>{
            state.laptops = action.payload
        },
        
        //***********carrito de compras
        addToCart: (state, action)=>{
            const element = action.payload
            const newElement = {
                ...element, specifications:{
                    ...element.specifications, price: element.specifications.offert ? element.specifications.offert : element.specifications.price
                } 
            }
            let iteminCart = state.cart.find(item => item.id === element.id)

            return iteminCart?  

            {
                ...state,
                cart: state.cart
            }:
            {
                ...state,
                cart:[...state.cart, {...newElement, quantity:1}],
            }
        },

        addQuantity:(state, action)=>{
   
            return {
                ...state, 
                cart : state.cart.map(item => item.id === action.payload ? {...item, quantity: item.quantity + 1} : item )}
            
        },

        RemoveOneFromCart: (state, action)=>{

            let itemToDelete = state.cart.find(item => item.id === action.payload)
            
            return itemToDelete.quantity > 1 ? {
                ...state,
                cart: state.cart.map(item => item.id === action.payload ? {...item, quantity: item.quantity - 1}: item)
            } :
            {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        },

        RemoveAllFromCart: (state, action)=>{

            return{                
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        },

        ClearCart: (state, action)=>{
            state.cart = []
        },
        
    }
})

export const {  GuardarLista, addToCart, RemoveOneFromCart, RemoveAllFromCart, ClearCart, addQuantity,
                saveUser, deleteUser, 
                setIsLoading
} = cartSlice.actions

export default cartSlice.reducer