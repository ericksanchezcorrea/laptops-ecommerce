import { useState, useEffect } from 'react'
import { Typography, TextField, Box, Drawer,Badge, IconButton, Stack, Button, DialogContent} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
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
    height: null,
    model: "",
    offert: null,
    price: null,
    processor: "",
    ram: "",
    resolution: "",
    type_of_hard_drive: "",
    wi_fi: "",
    width: null,
    stock: null,
    visible: 'true'
}

function Dashboard() {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [succsess, setSuccsess] = useState(null)
    const [laptops, setLaptops] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [laptopSelect, setLaptopSelect] = useState(null)
    const [newLaptop, setNewLaptop] = useState(initialCreated)

    useEffect(() => {
       (() => {
        if(laptopSelect){
            setNewLaptop({
                position1: laptopSelect.images.position1,
                position2: laptopSelect.images.position2,
                position3: laptopSelect.images.position3,
                position4: laptopSelect.images.position4,
                position5: laptopSelect.images.position5,
                brand: laptopSelect.specifications.brand,
                hard_drive_capacity: laptopSelect.specifications.hard_drive_capacity,
                height: laptopSelect.specifications.height,
                model: laptopSelect.specifications.model,
                offert: laptopSelect.specifications.offert,
                price: laptopSelect.specifications.price,
                processor: laptopSelect.specifications.processor,
                ram: laptopSelect.specifications.ram,
                resolution: laptopSelect.specifications.resolution,
                type_of_hard_drive: laptopSelect.specifications.type_of_hard_drive,
                wi_fi: laptopSelect.specifications.wi_fi,
                width: laptopSelect.specifications.width,
                stock: laptopSelect.stock,
                visible: laptopSelect.visible? 'true' : 'false'
            })
        }
        else{
            setNewLaptop(initialCreated)
        }
      })()
    }, [laptopSelect])
    

    useEffect(()=>{
        (async function(){
            const response = await fetch(`${REACT_APP_BASE_URL}/api/laptops`)
            const data = await response.json()
            setLaptops(data)
            setIsLoading(false)
        })()
    },[])

    function validateError(){
        const newError = error.split(',')
        if(newError[0] === 'notNull Violation: Laptop.brand cannot be null') return 'Brand can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.model cannot be null') return 'Model can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.height cannot be null') return 'Height can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.width cannot be null') return 'Width can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.price cannot be null') return 'Price  can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.processor cannot be null') return 'Processor can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.type_of_hard_drive cannot be null') return 'Type of hard drive can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.ram cannot be null') return 'Ram can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.wi_fi cannot be null') return 'Wifi can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.resolution cannot be null') return 'Resolution can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.position1 cannot be null') return 'Position1 can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.position2 cannot be null') return 'Position2 can not be empty'
        if(newError[0] === 'notNull Violation: Laptop.stock cannot be null') return 'Stock can not be empty'
        if(newError[0].includes('invalid input syntax for type integer')) return 'Stock must be a integer'
        else{
            const colonIndex = newError[0].indexOf("."); // Obtiene el índice del primer ":" en la oración
            const extractedText = newError[0].substring(colonIndex + 1); 
            return extractedText
        }
    }

    const handleChange = ({target: {name, value}}) =>{
        setNewLaptop({
            ...newLaptop, [name]:value
        })
    }
    
    const createLaptop = async () => {
        if(newLaptop.offert > newLaptop.price){
            setError('offer cannot be higher than the price')
            return
        }
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
            console.log(res.error)
            setError(res.error)
            setSuccsess(null)
        }
        else{
            setError(null)  
            setSuccsess('created')
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
    
    const deleteLaptop = async (id) => {
        const authToken = await token()
        const userId = await uid()
        
        const response = await fetch(`${REACT_APP_BASE_URL}/api/laptop/${id}/${userId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        const res = await response.json()

        if(res.error) {
            console.log(res.error)
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

    const updateLaptop = async (id) => {
        if(newLaptop.offert >= newLaptop.price){
            setError('Offer cannot be higher than the price')
            return
        }
        const authToken = await token()
        const userId = await uid()
        const response = await fetch(`${REACT_APP_BASE_URL}/api/laptop/${id}/${userId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({...newLaptop, price: Number(newLaptop.price), offert:Number(newLaptop.offert), stock: Number(newLaptop.stock), visible: newLaptop.visible === 'false'? false : true })
        })
        const res = await response.json()
        if(res.error) {
            setError(res.error)
            setSuccsess(null)
        }
        else{
            setError(null)  
            setSuccsess('updated')
            setTimeout(() => {
                setOpenModal(false)
                setSuccsess(null)
                setNewLaptop(initialCreated)
            }, 800);

            const response = await fetch(`${REACT_APP_BASE_URL}/api/laptops`)
            const data = await response.json()
            setLaptops(data)
            setIsLoading(false)
            setLaptopSelect(null)
        }
    }

    if(isLoading) return

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'10px'}}>
        <h1 style={{margin:'0px'}}>Dashboard</h1>
        <h3 style={{margin:'0px'}}>Laptops</h3>
        
        <button onClick={()=>{setOpenModal(true)}}>Create Laptop</button>    

        <table style={{border:'1px solid black', borderCollapse: 'collapse', marginBottom:'20px'}}>
            <thead>
                <tr style={{ border:'1px solid #ddd'}}>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>Brand</th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>ID</th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>Price</th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>Update </th>
                    <th style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2'}}>Delete </th>
                </tr>
            </thead>
            <tbody>
                {
                    laptops?.map(p=>(
                        <tr key={p.id} style={{ border: '1px solid #6c757d', backgroundColor:`${p.visible === false? '#888888':''}`}}>
                            <td style={{ border: '1px solid black'}}>{p.id}</td>
                            <td style={{ border: '1px solid black'}}>{p.specifications.brand}</td>
                            <td style={{ border: '1px solid black'}}>{p.specifications.price}</td>
                            <td style={{ border: '1px solid black', textAlign:'center', cursor:'pointer'}} className='delete_button'
                                onMouseOver={(e) => e.target.style.color = '#1a237e'}
                                onMouseOut={(e)=> e.target.style.color = ''}
                                onClick={()=>{setLaptopSelect(p); setOpenModal(true) }}
                            >
                                <BorderColorIcon color='secondary' />
                            </td>
                            
                            <td style={{ border: '1px solid black', textAlign:'center', cursor:'pointer'}}
                                onMouseOver={(e) => {e.target.style.color = 'red'}}
                                onMouseOut={(e)=> {e.target.style.color = '#d32f2f'}}
                                onClick={()=>{deleteLaptop(p.id)}}
                                >
                                <DeleteIcon color='error' />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <Modal
            open={openModal}
            onClose={()=>{setOpenModal(!openModal); setNewLaptop(initialCreated); setError(null); setSuccsess(null); setLaptopSelect(null)} }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{display:'flex', width:'100%', flexWrap:'wrap', justifyContent:'space-between', gap:'5px'}}>
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position1} onChange={handleChange} name='position1' label="Position1" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position2} onChange={handleChange} name='position2' label="Position2" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position3} onChange={handleChange} name='position3' label="Position3" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position4} onChange={handleChange} name='position4' label="Position4" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.position5} onChange={handleChange} name='position5' label="Position5" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.brand} onChange={handleChange} name='brand' label="Brand" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.hard_drive_capacity} onChange={handleChange} name='hard_drive_capacity' label="Hard drive Capacity" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.height || ''} onChange={handleChange} name='height' label="Height" variant="standard" type='number'/>
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.model} onChange={handleChange} name='model' label="Model" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.offert || ''} onChange={handleChange} name='offert' label="Offer" variant="standard" type='number'/>
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.price || ''} onChange={handleChange} name='price' label="Price" variant="standard" type='number' />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.processor} onChange={handleChange} name='processor' label="Processor" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.ram} onChange={handleChange} name='ram' label="Ram" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.resolution} onChange={handleChange} name='resolution' label="Resolution" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.type_of_hard_drive} onChange={handleChange} name='type_of_hard_drive' label="Type of hard drive" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.wi_fi} onChange={handleChange} name='wi_fi' label="Wi fi" variant="standard" />
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.width || ''} onChange={handleChange} name='width' label="Width" variant="standard" type='number'/>
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.stock || ''} onChange={handleChange} name='stock' label="stock" variant="standard" type='number'/>
                    <TextField sx={{ width:'250px' }} id="standard-basic" value={newLaptop.visible} onChange={handleChange} name='visible' label="visible" variant="standard" />
                </Box>

                {
                    laptopSelect?
                    <Button variant="contained" sx={{marginTop:'20px'}} onClick={()=>{updateLaptop(laptopSelect.id)}}>Update</Button>
                    :
                    <Button variant="contained" sx={{marginTop:'20px'}} onClick={createLaptop}>Create</Button>
                }
                {
                    error &&
                    // <Typography sx={{ color:'red' }} variant='h5'>{error.split(',')[0]}</Typography>
                    <Typography sx={{ color:'red' }} variant='h5'>{validateError()}</Typography>
                }
                {
                    succsess &&
                    <Typography sx={{ color:'green' }} variant='h5'>Laptop {succsess} </Typography>
                }
            </Box>

        </Modal>
     

    </div>
  )
}

export default Dashboard