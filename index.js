const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// middleware

app.use(cors());
app.use(express())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iitoxlh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    

    try {
        
    }
    catch {
        console.log("error from server");
    }
}



app.get('/', async (req, res) => {
    res.send('used product server running');
})

app.listen(port, ()=>console.log(`server running on ${port}`))