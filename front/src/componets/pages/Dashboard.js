import { useState, useEffect } from 'react'
import { Typography, TextField, Box, Drawer,Badge, IconButton, Stack, Button} from '@mui/material'
import Modal from '@mui/material/Modal';
import { token, uid } from '../../firebase/firebase';
import { REACT_APP_BASE_URL } from '../../config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color:'black',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
};

const initialCreated = {
    position1: "",
    position2: "",
    position3: "",
    position4: "",
    position5: "",
    brand: "",
    hard_drive_capacity: "",
    height: "",
    model: "",
    offert: "",
    price: "",
    processor: "",
    ram: "",
    resolution: "",
    type_of_hard_drive: "",
    wi_fi: "",
    width: ""
}

function Dashboard() {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [succsess, setSuccsess] = useState(null)
    const [laptops, setLaptops] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [newLaptop, setNewLaptop] = useState(initialCreated)

    useEffect(()=>{
        (async function(){
            const response = await fetch(`${REACT_APP_BASE_URL}/api/laptops`)
            const data = await response.json()
            setLaptops(data)
            setIsLoading(false)
        })()
    },[])

    const handleChange = ({target: {name, value}}) =>{
        setNewLaptop({
            ...newLaptop, [name]:value
        })
    }

    const deleteLaptop = () => console.log('deleteLaptop')
    const updateLaptop = () => console.log('UpdateLaptop')
    
    const createLaptop = async () => {
        const authToken = await token()
        const userId = await uid()
        const response = await fetch(`${REACT_APP_BASE_URL}/api/laptop/${userId}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(newLaptop)
        })
        const res = await response.json()
        if(res.error) {
            setError(res.error)
            setSuccsess(null)
        }
        else{
            setError(null)  
            setSuccsess(true)
            setTimeout(() => {
                setOpenModal(false)
                setSuccsess(null)
                setNewLaptop(initialCreated)
            }, 800);

            const response = await fetch(`${REACT_APP_BASE_URL}/api/laptops`)
            const data = await response.json()
            setLaptops(data)
            setIsLoading(false)
        }
    }

    if(isLoading) return

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'10px'}}>
        <h1 style={{margin:'0px'}}>Dashboard</h1>
        <h3 style={{margin:'0px'}}>Laptops</h3>
        
        <button onClick={()=>{setOpenModal(true)}}>Create Laptop</button>    

        <table style={{border:'1px solid black', borderCollapse: 'collapse'}}>
            <thead>
                <tr style={{ border:'1px solid #ddd'}}>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>Brand</th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>ID</th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>Price</th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}> Update </th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}> Delete </th>
                </tr>
            </thead>
            <tbody>
                {
                    laptops?.map(p=>(
                        <tr key={p.id} style={{ border: '1px solid #6c757d'}}>
                            <td style={{ border: '1px solid black'}}>{p.id}</td>
                            <td style={{ border: '1px solid black'}}>{p.specifications.brand}</td>
                            <td style={{ border: '1px solid black'}}>{p.specifications.price}</td>
                            <td style={{ border: '1px solid black'}}>button</td>
                            <td style={{ border: '1px solid black'}}>button</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <Modal
            open={openModal}
            onClose={()=>{setOpenModal(!openModal); setNewLaptop(initialCreated); setError(null); setSuccsess(null)} }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{display:'flex', width:'100%', flexWrap:'wrap', justifyContent:'space-between', gap:'10px'}}>
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position1} onChange={handleChange} name='position1' label="Position1" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position2} onChange={handleChange} name='position2' label="Position2" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position3} onChange={handleChange} name='position3' label="Position3" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position4} onChange={handleChange} name='position4' label="Position4" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position5} onChange={handleChange} name='position5' label="Position5" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.brand} onChange={handleChange} name='brand' label="Brand" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.hard_drive_capacity} onChange={handleChange} name='hard_drive_capacity' label="Hard drive Capacity" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.height} onChange={handleChange} name='height' label="Height" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.model} onChange={handleChange} name='model' label="Model" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.offert} onChange={handleChange} name='offert' label="Offert" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.price} onChange={handleChange} name='price' label="Price" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.processor} onChange={handleChange} name='processor' label="Processor" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.ram} onChange={handleChange} name='ram' label="Ram" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.resolution} onChange={handleChange} name='resolution' label="Resolution" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.type_of_hard_drive} onChange={handleChange} name='type_of_hard_drive' label="Type of hard drive" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.wi_fi} onChange={handleChange} name='wi_fi' label="Wi fi" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.width} onChange={handleChange} name='width' label="Width" variant="standard" />
                </Box>

                <Button variant="contained" sx={{marginTop:'20px'}} onClick={createLaptop}>Create</Button>
                {
                    error &&
                    <Typography sx={{ color:'red' }} variant='h5'>{error.split(',')[0]}</Typography>
                }
                {
                    succsess &&
                    <Typography sx={{ color:'green' }} variant='h5'>Laptop created</Typography>
                }
            </Box>

        </Modal>
     

    </div>
  )
}

export default Dashboard