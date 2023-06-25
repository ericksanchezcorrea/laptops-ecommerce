import {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Grid, Typography, Stack, Button, Box, TextField} from '@mui/material'
import { token, uid } from '../../firebase/firebase';
import { REACT_APP_BASE_URL } from '../../config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color:'black'
  };


const EditAddress = ({handleCloseModal, openModal, data, setAddressess}) => {

    const[address, setAddress] = useState(data)
    const user = useSelector(state => state.cartStore.user) 

    useEffect(() => {
      setAddress(data)
    }, [openModal])
    

    const handleChange = (e) => {
        const {name, value} = e.target
        setAddress({
            ...address, [name]:value
        })
    };

    const save = async (id) =>{
        // Actualizar dirección
        const userId = await uid(); 
        const authToken = await token(); 
        
        const body ={
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
            country: address.country,
            reference: address.reference,
            state: address.state,
        }

        const response = await fetch(`${REACT_APP_BASE_URL}/api/address/${id}/${userId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({...body}) 
        });
        const data = await response.json();

        // Actualizar direcciones
        const response2 = await fetch(`${REACT_APP_BASE_URL}/api/address/${user.email}/${userId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          })
        const addresses = await response2.json()
        setAddressess(addresses)
        handleCloseModal()
    }

  return (
    <Modal
        open={openModal}
        onClose={()=>{handleCloseModal()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Stack sx={style} gap="10px">
            <Stack direction="row" alignItems="center">
                <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 18, borderRadius:'10px', minWidth:'150px'}}>Street</Typography>
                <Stack direction='row' justifyContent="space-between" width='80%'>
                    <TextField fullWidth id="fullWidth" size='small'
                                name='street'
                                onChange={handleChange}
                                defaultValue={data.street}
                    />
                </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
                <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 18, borderRadius:'10px', minWidth:'150px'}}>City</Typography>
                <Stack direction='row' justifyContent="space-between" width='80%'>
                    <TextField fullWidth id="fullWidth" size='small'
                                name='city'
                                onChange={handleChange} 
                                defaultValue={data.city}
                    />
                </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
                <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 18, borderRadius:'10px', minWidth:'150px'}}>State</Typography>
                <Stack direction='row' justifyContent="space-between" width='80%'>
                    <TextField fullWidth id="fullWidth" size='small'
                                defaultValue={data.state}
                                name='state'
                                onChange={handleChange} 
                    />
                </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
                <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 18, borderRadius:'10px', minWidth:'150px'}}>Postal Code</Typography>
                <Stack direction='row' justifyContent="space-between" width='80%'>
                    <TextField fullWidth id="fullWidth" size='small'
                                defaultValue={data.postalCode}
                                name='postalCode'
                                onChange={handleChange} 
                    />
                </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
                <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 18, borderRadius:'10px', minWidth:'150px'}}>Country</Typography>
                <Stack direction='row' justifyContent="space-between" width='80%'>
                    <TextField fullWidth id="fullWidth" size='small'
                                defaultValue={data.country}
                                name='country'
                                onChange={handleChange} 
                    />
                </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
                <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: 18, borderRadius:'10px', minWidth:'150px'}}>Reference</Typography>
                <Stack direction='row' justifyContent="space-between" width='80%'>
                    <TextField fullWidth id="fullWidth" size='small'
                                defaultValue={data.reference}
                                name='reference'
                                onChange={handleChange} 
                    />
                </Stack>
            </Stack>

            <Button size='large' variant='contained' onClick={()=>{save(data.id)}}>Save</Button>
        </Stack>
    </Modal>
  )
}

export default EditAddress