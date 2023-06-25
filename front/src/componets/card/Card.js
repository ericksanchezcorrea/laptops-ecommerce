import {Card,CardContent,CardMedia, Typography,Stack} from '@mui/material';
import {Link} from "react-router-dom"


const RenderCard =({id, image, model, price, offert}) => {

  return (

    <Card sx={{ maxWidth: 345, margin:0, marginTop:1, textAlign:'center'}}>
      <Link to={"/laptop/"+id}>
        <CardMedia sx={{objectFit:'contain', minWidth:'250px'}}
          component="img"
          height="240"
          image={image}
          alt="laptop"
          width={'100%'}
          />
      </Link>  

      <CardContent sx={{padding:0}}>

        <Typography gutterBottom variant="body1" component="div" sx={{display: 'block', height:'48px', overflow:'hidden'}} >
          {model}
        </Typography>
      </CardContent>

      <Stack mb={2}>
        <Typography size="small"  sx={{display:'block', color:'#607d8b', fontWeight:700, fontSize:'18px',
                    textDecoration:{xs: offert ? 'line-through' : 'none'} }}>
          Normal: S/.{price}</Typography>
       

        <Typography size="small"  sx={{display:'block', fontWeight:700, fontSize:'18px',  
                                        color:{xs: offert ? 'red' : 'transparent' } }}>Offert: S/.{offert}</Typography>
        
      </Stack>

    </Card>
  );
}

export default RenderCard

