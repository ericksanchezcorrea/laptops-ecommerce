import { useEffect } from "react"
import {Grid, Stack,TextField} from "@mui/material";
import getApi from "../common/getApi/getApi";
import RenderCard from '../card/Card'
import { useSearchParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { GuardarLista } from '../../features/taskSlices';
import Spinner from "../spinner/Spinner";
import { REACT_APP_BASE_URL } from "../../config";

const Principal = () =>{

    const [searchParams, setSearchParams] = useSearchParams();
    
    const dispatch = useDispatch()
    
    const handleFilter = (e) => {setSearchParams({filter: e.target.value})}
    let filter = searchParams.get('filter') || ""
    
    const callApi = async () => {
        const data = await getApi(`${REACT_APP_BASE_URL}/api/laptops`);
        dispatch(GuardarLista(data)) 
    };
    
    useEffect(() => {
        callApi();
    }, []);
    
    const laptops = useSelector(state => state.cartStore.laptops)

    if(laptops.length === 0) return <Spinner />
    if(laptops?.message) return <p>There was a problem loading the page.</p>
    
    return(
        <Grid container p={5}>
            <Stack  sx={{display:'flex', justifyContent:'center', width:500, marginX:'auto', height:'100px', outline:'none', border:'none'  }} >
                <TextField id="filled-basic" label="Search..." variant="standard" autoFocus autoComplete="off"
                            onChange={handleFilter}
                            value={filter}
                            />
            </Stack>

            <Grid container spacing={2}>
                {   laptops.filter((laptop) => {
                    if (!filter) return true;
                    return laptop.specifications.model.toLowerCase().includes(filter.toLowerCase() ) })
                    .map((laptop, index) =>(
                    <Grid item xs={12} sm={6} md={4} lg={3} 
                        key={index}> 
                        <RenderCard
                            id={laptop.id}
                            image={laptop.images.position1}
                            model={laptop.specifications.model}
                            price={laptop.specifications.price}  
                            offert={laptop.specifications.offert}                                 
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>                
    )
}

export default Principal