import { Grid, Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Header from './Header'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Passion from '../assets/the_passion_within.jpg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Dashboard = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <div>
        <Header/>
        <Grid container rowSpacing={4} spacing={2} sx={{pt: 1, px: 3}}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>

        <Grid container rowSpacing={4} spacing={2} sx={{pt: 1, px: 10}}>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="194"
                image={Passion}
                alt="Paella dish"
              />
              <CardContent>
                <Typography>Title</Typography> 
                <Typography variant="body2" color="text.secondary">
                  Author
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Tooltip title='Add to wishlist'>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Add to Cart'>
                  <IconButton aria-label="add to cart">
                    <AddShoppingCartIcon/>
                  </IconButton>
                </Tooltip>
                <Typography mx={2}>$20.00</Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    </div>
  )
}

export default Dashboard