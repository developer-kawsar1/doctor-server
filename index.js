const express = require('express')   
const cors = require('cors'); 
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb'); 
const uri = `mongodb+srv://doctor_admin:${process.env.DB_PASS}@cluster0.yrhmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;  
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






// console.log(process);
// console.log(uri);

const app = express() 
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send(process.env.DB_PASS)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   


async function run(){
  try{
   await client.connect(); 
   const servicesCollection=client.db('doctor_portal').collection('services')
   app.get('/service', async(req,res)=>{
     const query={}
     const cursor=servicesCollection.find(query)
     const services=await cursor.toArray();
     res.send(services)
   })
  }finally{

  }
}


run().catch(console.dir);