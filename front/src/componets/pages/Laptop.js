import { useEffect, useState } from 'react' 
import { useParams, useNavigate} from 'react-router-dom' 
import { Grid, Typography,  Box, Button, Stack} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart } from '../../features/taskSlices'

import Table from '../table/Table'
import Carrusel from '../imagenes-carrusel'
import getApi from '../common/getApi/getApi'
import Spinner from '../spinner/Spinner'
import { REACT_APP_BASE_URL } from '../../config'


const Laptop =()=>{

const params = useParams().id
const navigate = useNavigate()
const dispatch = useDispatch()

const [element, setElement] = useState(null)

useEffect(() => {
    const fetchData = async () => {
      try {
        const laptop = await getApi(`${REACT_APP_BASE_URL}/api/laptops?id=${params}`);
        setElement(laptop);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
}, []);
  

const add_To_Cart=(element)=>{ 
    dispatch(addToCart(element))
}

if(element === null ) return <Spinner />
if(element?.message) return <p>There was a problem loading the page.</p>
if(element?.error) return <p>Product not found</p>

return(
    <Grid container mt={5}>
      
        {element &&
        <Grid container>

            <Grid item xs={12} md={7}>
                <Carrusel imagen1={element?.images.position1} 
                          imagen2={element?.images.position2} 
                          imagen3={element?.images.position3} 
                          imagen4={element?.images.position4} 
                          imagen5={element?.images.position5} />
            </Grid>

            <Grid item xs={6} md={5}
                    sx={{
                         mx:{xs:'auto'},
                         minWidth:{xs:'300px'},
                         display:{md:'block'}
                        }}>
                <Stack sx={{width:{md:'80%'}, margin:{xs:'gray', md:'auto'}}}>        
                    <Typography variant='h6'>{element.specifications.model}</Typography>

                    <Box sx={{display:'flex', justifyContent:'space-between'}} mt={2} mb={2} color='gray'>
                    </Box>
                        
                        <Box sx={{display:'flex', justifyContent:'space-between', color:'#607d8b'}}>
                            <Typography variant='body2' fontSize={'21px'}>Normal</Typography>
                            <Typography variant='body2'  sx={{fontSize:'21px', textDecoration: element.specifications.offert? 'line-through':'none' }}>
                                S/. {element.specifications.price}</Typography>
                        </Box>
                        
                    {
                        element.specifications.offert &&                        
                        <Box sx={{display:'flex', justifyContent:'space-between', color:'#6a148e'}}>
                            <Typography variant='body2' fontSize={'21px'}>Internet</Typography>
                            <Typography variant='body2' fontSize={'21px'}>S/. {element.specifications.offert}</Typography>
                        </Box>
                    }
                
                    { 
                        element.specifications.offert  && 
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>

                            <Typography variant='body2' fontSize={'21px'} color='#666'>Discount</Typography>

                            <Typography variant='body2' fontSize={'21px'}>
                
                           { Math.round((element.specifications.price - element.specifications.offert)/element.specifications.price*100) + " %"}
                            
                            </Typography>
                        </Box>
                    }  

                    <Stack marginTop={2}>
                        <Button variant='contained' color='success' sx={{width:'200px', margin:'auto'}}
                                onClick={ ()=> add_To_Cart(element) }>
                            Agregar al carrito
                        </Button>
                    </Stack>
                        
                </Stack>

            </Grid>

            <Grid item xs={12}>      
                <Stack mt={4}>
                    <Table  height={element.specifications.height}
                            width={element.specifications.width}
                            brand={element.specifications.brand}
                            hard_drive_capacity={element.specifications.hard_drive_capacity}
                            type_of_hard_drivey={element.specifications.type_of_hard_drive}
                            processor={element.specifications.processor}
                            resolution={element.specifications.resolution}
                            type_of_hard_drive={element.specifications.type_of_hard_drive}
                            wi_fi={element.specifications.wi_fi}
                            ram={element.specifications.ram}
                    />
                </Stack>
            </Grid>
        </Grid>    
       }
        
    </Grid>
)


}

export default Laptop