const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port =process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{

    res.send('fitness tracker server is runing')
})

app.listen(port,() => {
    console.log (`fitness tracker  server is runing on port ${port} `)
})