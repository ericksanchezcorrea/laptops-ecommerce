import React from 'react'
import {useState, useEffect} from 'react'
import { Typography, Box, Drawer,Badge, IconButton, Stack, Button} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import './drawerCart.css'

import {useDispatch, useSelector} from 'react-redux'
import { RemoveAllFromCart, RemoveOneFromCart, ClearCart, addQuantity } from '../../features/taskSlices'
import useLocalStorage from '../../useLocalStorage'

import sendPurchase from '../common/sendPurchase/sendPurchase';

import { useNavigate } from 'react-router-dom';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color:'black'
};

const DrawerCart = () => {    
    
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(null)
    const carrito = useSelector(state => state.cartStore.cart)
    const user = useSelector(state => state.cartStore.user)

    const dispatch = useDispatch()

    const [cart, setCart] = useLocalStorage('cart', "")
    const navigate = useNavigate()

    useEffect(() => {
        setCart(carrito)
    }, [carrito])
    
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const OpenDrawer = () => setOpen(!open)
    const onClose = () => setOpen(!open)
    
    const EliminarTodoDelcarrito = (id) =>{dispatch(RemoveAllFromCart(id))}

    const restarCantidad = (id) =>{dispatch(RemoveOneFromCart(id))}

    const Vaciarcarrito = () =>{dispatch(ClearCart())}

    const sumarCantidad = (id) =>{dispatch(addQuantity(id))}

    const confirmOrder = () =>{
        if(!user){
            setError("You must log in to make a purchase")
            handleOpenModal()
            return
        } 
        if(carrito.length === 0){
            setError("Your shopping cart is empty")
            return handleOpenModal()
        } 
        navigate('/checkout')
        onClose()
        setError(null)
    }

    let total = 0

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        total += item.specifications?.price * item?.quantity        
    }

  return (
    <>
        <IconButton color="neutral" sx={{marginRight:'20px'}} onClick={OpenDrawer}>
            <Badge badgeContent={carrito.length} color="secondary" >
                <ShoppingCartIcon />
            </Badge>
        </IconButton>

        <Modal
            open={openModal}
            onClose={()=>{handleCloseModal(); onClose()} }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {
                    error &&
                    <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 20, borderRadius:'10px'}}>
                        {error}
                    </Typography>
                }
            </Box>
        </Modal>

        <Drawer anchor='right' open={open} onClose={onClose} >
            <Box sx={{padding:'20px'}}>

                {   
                    carrito.length < 1 ?                
                    <Typography variant='h6'>Your cart is empty</Typography>
                    :   
                    carrito.map(element => 
                        <Stack direction ='row' gap='10px' className='stack-drawer' key={element.id}>

                            <img src={element.images?.position1} alt='imagen' height='75px' width='55.5px'/>
            
                            <Stack direction='column'textAlign='center'>
            
                                <Typography>{element.specifications?.brand}</Typography>
                                    <Typography>S/. {element.specifications?.price}</Typography>
                                    <Stack direction='row'>
                                        <IconButton color="neutral" size='small' 
                                        sx={{backgroundColor:'#9e9e9e', borderRadius:'0px',
                                        '&:hover':{backgroundColor:'#616161'} }}
                                        onClick={()=>restarCantidad(element.id)}
                                        >                     
                                            <RemoveIcon />
                                        </IconButton>
                                            
                                        <Stack justifyContent='center' m={1} > { element?.quantity } </Stack>
                
                                        <IconButton color="neutral" size='small' 
                                        sx={{backgroundColor:'#9e9e9e', borderRadius:'0px','&:hover':{backgroundColor:'#616161'} }} 
                                        onClick={()=>sumarCantidad(element.id)}
                                        >                     
                                            <AddIcon  />
                                        </IconButton>
                                    </Stack>
                            </Stack>    
                            
                            <Stack direction='column'  >                 
                                <IconButton sx={{ color:'#e57373','&:hover':{backgroundColor:'#e57373', color:'#fafafa'} }}
                                        onClick={ ()=> EliminarTodoDelcarrito(element.id) }
                                >
                                <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </Stack>    
                    )
                }

                <Typography variant='h6' textAlign='right'>Total: { total } </Typography>

                <Stack className='button-actions' gap={'10px'} direction='row'>
                    <Button variant='contained' sx={{backgroundColor:'#0277bd', color:'white', 
                        '&:hover':{ backgroundColor:'#01579b' } }} 
                        onClick={ ()=> { Vaciarcarrito() }}
                        >
                    Clear Cart</Button>
                </Stack>

                <Stack className='button-actions' gap={'10px'} direction='row'>
                    <Button variant='contained' color='error' onClick={onClose}>Close</Button>
                    <Button variant='contained' color='success' onClick={confirmOrder}>Confirm Order</Button>
                </Stack>

            </Box>

        </Drawer>
    </>
  )
}

export default DrawerCart