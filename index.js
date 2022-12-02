const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { restart } = require('nodemon');
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iitoxlh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    const userCollection = client.db('assignment').collection('users');
    const productCollection = client.db('assignment').collection('products');
    const advertiseCollection = client.db('assignment').collection('advertise');
    const reportCollection = client.db('assignment').collection('report');
    const bookingCollection = client.db('assignment').collection('booking');

    try {

        // user collection to db

        //insert user info
        app.post('/user', async (req, res) => {
            const userInfo = req.body;
            const result = await userCollection.insertOne(userInfo);
            res.send(result);
        });

        //insert user info
        app.post('/booking', async (req, res) => {
            const bookingInfo = req.body;
            const result = await bookingCollection.insertOne(bookingInfo);
            res.send(result);
        });
        app.get('/myOrders/:email', async (req, res) => {
            const email = req.params.email;
            const query = { BuyerEmail: email };
            const cursor = bookingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        //get user info
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        });
        //all users
        app.get('/dashboard/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        //insert advertise info
        app.post('/advertise_product', async (req, res) => {
            const advertiseInfo = req.body;
            const result = await advertiseCollection.insertOne(advertiseInfo);
            res.send(result);
        });
        //add product
        app.post('/addProduct', async (req, res) => {
            const productInfo = req.body;
            console.log(productInfo);
            const result = await productCollection.insertOne(productInfo);
            res.send(result);
        });


        //report
        app.post('/report', async (req, res) => {
            const productInfo = req.body;
            const result = await reportCollection.insertOne(productInfo);
            res.send(result);
        });

        //find a specific seller product
        app.get('/dashboard/my_products/:email', async (req, res) => {
            const email = req.params.email;
            const query = {SellerEmail: email}
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        //find a specific category product
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { Category: id }
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        //deleted
        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            };
            const result = await productCollection.deleteOne(query);
            res.send(result)
        });


        //deleted reported item
        app.delete('/deleteProduct/:id', async (req, res) => {
            const id = req.params.id;
            const Reportquery = {
                _id: id
            };
            const Productquery = {
                _id: ObjectId(id)
            };
            const Advertisequery = {
                _id: id
            };

            const result = await productCollection.deleteOne(Productquery);
            const result1 = await reportCollection.deleteOne(Reportquery);
            const result2 = await advertiseCollection.deleteOne(Advertisequery);
            res.send(result)
        });
        // find category product 
        app.get("/category", async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // find all advertisement product 
        app.get("/advertiseItems", async (req, res) => {
            const query = {};
            const cursor = advertiseCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })


        // find all report
        app.get("/report", async (req, res) => {
            const query = {};
            const cursor = reportCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(err => console.log(err))

app.get('/', (req, res) => {
    console.log('test')
    res.send('api found')

})
app.listen(port, () => {
    console.log('server running')
})