import { useState, useEffect } from 'react'
import { Grid, Typography, Stack, Button, Box} from '@mui/material'
import Modal from '@mui/material/Modal';

import EditAddress from '../editAddress/EditAddress';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useSelector } from 'react-redux'
import sendPurchase from '../common/sendPurchase/sendPurchase';
import { useNavigate } from 'react-router-dom';
 
import { useModal } from '../common/useModal/useModal';
import AddAddress from '../addAddress/AddAddress';

import { token, uid } from '../../firebase/firebase'
import { REACT_APP_BASE_URL } from '../../config';


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

const Checkout = () => {

    const carrito = useSelector(state => state.cartStore.cart)
    const user = useSelector(state => state.cartStore.user)

    const [addresses, setAddressess] = useState(null)
    const [address, setAddress] = useState({})
    const [radioValue, setRadioValue] = useState('');
    const [error, setError] = useState(null);

    const[openModal, handleOpenModal, handleCloseModal] = useModal(false)
    const[openAdd, openModalAdd, closeModalAdd] = useModal(false)
    const[openError, openModalError, closeModalError] = useModal(false)

    const navigate = useNavigate();

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
    };

    let total = 0

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        total += item.specifications?.price * item?.quantity        
    }

    useEffect(() => {
        (async()=>{
            if (user){
                const userId = await uid(); 
                const authToken = await token(); 
    
                const response = await fetch(`${REACT_APP_BASE_URL}/api/address/${user.email}/${userId}`,
                {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                }) 
                const addresses = await response.json()
                setAddressess(addresses)       
            }
        })()
    }, [])
    


    const deleteAddress = async (id) =>{
        try {
            const userId = await uid(); 
            const authToken = await token(); 
            
            const response = await fetch(`${REACT_APP_BASE_URL}/api/address/${id}/${userId}`,
            {
                method:'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }) 
            await response.json()
    
            if (user){
                const response = await fetch(`${REACT_APP_BASE_URL}/api/address/${user.email}/${userId}`,
                {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                }) 
                const addresses = await response.json()
                setAddressess(addresses)       
            }
        } catch (error) {
            console.log(error)
        }
    }


    const buy = async () =>{
        try {
            const userId = await uid(); 
            const authToken = await token(); 
            
            
            if(radioValue === '') {
                setError("Select one address")
                openModalError()
                return
            }

            if(carrito.length === 0) {
                setError("Your shoppingCart is empty")
                openModalError()
                return
            }

            const data = await sendPurchase(`${REACT_APP_BASE_URL}/api/create-order/${userId}`, carrito, radioValue, user.email, authToken)
            setError(null)
            window.location.href = data
            
        } catch (error) {
            console.log(error)
        }
    }

  return (

        <Grid container mt={5} p={5}>

            <Modal
                open={openError}
                onClose={()=>{closeModalError()} }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 20, borderRadius:'10px'}}>
                        {error}
                    </Typography>
                </Box>
            </Modal>

            <AddAddress handleCloseModal={closeModalAdd} openModal={openAdd} email={user?.email} setAddressess={setAddressess} />

            <Grid item xs={12} mb={3} textAlign='center'>
                <Typography variant='h4'>Where do you want to receive your purchase?</Typography>
            </Grid>


            <Stack xs={12} spacing={4} p={4} direction="row" alignItems="flex-start" justifyContent="space-between" sx={{width:'100%'}}>

                <Stack>
                    <Stack xs={12} >
                        <Button color="secondary" variant='contained' fontSize={"30px"} onClick={openModalAdd} >Add address</Button>
                    </Stack>

                    <EditAddress handleCloseModal={handleCloseModal} openModal={openModal} data={address} setAddressess={setAddressess} />

                    {
                        addresses && addresses.length !== 0 ?
                        (
                            addresses.map(a =>(
                                <Stack  key={a.id} direction="row" alignItems="center" justifyContent="space-between" 
                                        sx={{border:'1px solid black', padding:'5px', marginBottom:"10px"}}>
                                    
                                    <Stack>
                                        <label >
                                            <input
                                            type="radio"
                                            value={a.id}
                                            checked={radioValue === a.id}
                                            onChange={handleRadioChange}
                                            style={{display:"block", height:"30px", width:'20px'}}
                                            />
                                        </label>
                                    </Stack>    

                                    <Stack p={2} >
                                        <Typography variant='body1'>{a.city}, {a.country}</Typography>
                                        <Typography variant='body1'>{a.state}</Typography>
                                        <Typography variant='body1'>{a.reference}</Typography>
                                        <Typography variant='body1'>{a.street}</Typography>
                                    </Stack>

                                    <Stack direction="row">
                                        <EditIcon sx={{cursor:'pointer', ':hover':{color:"green"}}} onClick={()=>{setAddress(a); handleOpenModal()}} />
                                        <DeleteIcon sx={{cursor:'pointer', ':hover':{color:"crimson"}}} onClick={()=>deleteAddress(a.id)}/>
                                    </Stack>
                                </Stack> 
                            ))
                        )
                        :
                        (
                            <Typography variant='body1'>No registered address yet</Typography>
                        )
                    }
                </Stack>
           
                <Stack flex={1}  >
                    {
                        carrito?.map(p=>(
                            <Stack key={p.id} direction="row" alignItems="center" justifyContent="center" gap="20px" sx={{width:'100%'}}>
                                <img src={p.images.position1}  width="100px" height="100px"/>
                                <Typography>{p.specifications.brand}</Typography>
                                <Typography>Quantity: {p.quantity}</Typography>
                            </Stack>
                        ))
                    }
                    
                    <Stack alignItems="center" justifyContent="center">
                        <Typography variant="h5" mt={3} >Total: S/. {total}</Typography>
                    </Stack>
                </Stack>        
            </Stack>


            <Grid item xs={12}>
                <Stack alignItems="center" justifyContent="center" flex={1} m={2}>
                    <Button variant='contained' fontSize={"30px"} onClick={buy}>Buy</Button>
                </Stack>
            </Grid>
       
        </Grid>
  )
}

export default Checkout