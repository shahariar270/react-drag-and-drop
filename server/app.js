const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(cors());
app.use(express.json())

const port = 3000;

app.get('/', (req, res)=>{
    res.status(200).json('data fetch successfully')
})

app.listen(port , ()=>{
    console.log('hello i server i ruing successfully');
})