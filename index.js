const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



app.use(cors());
app.use(express.json())

//fitesstracker
//VshwRQKmLA9HfCVW



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5du28se.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const teacherCollection = client.db('fitnesstrackerDB').collection('teacher');
    const classCollection = client.db('fitnesstrackerDB').collection('classes');

    app.post('/teacher', async(req,res)=>{
      const newteacher = req.body;
      console.log(newteacher) ;
      const result = await teacherCollection.insertOne(newteacher);
      res.send(result);
    })

    app.post('/classes', async(req,res)=>{
      const newclass = req.body;
      console.log(newclass) ;
      const result = await classCollection.insertOne(newclass);
      res.send(result);
    })

    app.get('/classes', async(req,res)=>{
      const cursor = classCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/classes/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await  classCollection.findOne(query);
      res.send(result);
    })

    app.get('/teacher', async(req,res)=>{
      const cursor = teacherCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    app.get('/teacher/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await teacherCollection.findOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{

    res.send('fitness tracker server is runing')
})

app.listen(port,() => {
    console.log (`fitness tracker  server is runing on port ${port} `)
})