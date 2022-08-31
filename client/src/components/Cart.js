import { Grid } from '@mui/material'
import React from 'react'
import Header from './Header'
import PassionImg from '../assets/the_passion_within.jpg'

const Cart = () => {
  return (
    <div>
        <Header/>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <img
                src={PassionImg}
                alt="passion"
                />
            </Grid>
            <Grid item xs={6}>
                <p>My name is gerals</p>
            </Grid>
        </Grid>
    </div>
  )
}

export default Cart