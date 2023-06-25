import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography,  Box, Button, Stack} from '@mui/material'
import { token, uid } from '../../firebase/firebase'
import { REACT_APP_BASE_URL } from '../../config'


const Myorders = () => {

    const user = useSelector(state => state.cartStore.user)
    const [orders, setOrders] = useState(null)
    
    useEffect(() => {
        (async function(){
            const userId = await uid(); 
            const authToken = await token(); 

            if(user){
                const response = await fetch(`${REACT_APP_BASE_URL}/api/shoppingCart/${user.email}/${userId}`,
                {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                }) 
                const data = await response.json()
                if(data.message) return console.log(data)
                setOrders(data)
            }

      
        })()
    }, [user])


  return (
    <Grid container mt={5} mb={5}>
        <Stack direction="column" justify="center" alignItems="center" width="100%">
            <Stack>
                <Typography variant="h3" mb={2}>Myorders</Typography>
            </Stack>

            <Stack justify="center" alignItems="center" gap='10px'>
                {
                    orders && orders.map((order,i)=>(
                        <Stack direction='row' justifyContent="space-between" alignItems="center" 
                            key={i} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding:'10px', width:'500px'}}>

                            <Stack direction='column' justifyContent="center" gap='5px'>
                                {order.laptops.map((laptop, i) =>(
                                    <Stack direction="row" justifyContent="space-between" gap="20px" key={i}>
                                        <Typography variant="body2"  width="200px">{laptop.model.slice(0,20)}</Typography> 
                                        <Typography variant="body2">Quantity: {laptop.quantity} </Typography> 
                                    </Stack>
                                ))
                                }
                            </Stack>
                            <Typography textAlign="center">Total: {order.total}</Typography>
                            
                        </Stack>
                    ))
                }
            </Stack>
        </Stack>
    </Grid>
  )
}

export default Myorders