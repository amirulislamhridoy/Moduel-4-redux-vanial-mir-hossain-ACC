const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors')
require('dotenv').config()

app.use(cors())

// const uri = "mongodb+srv://practise:32202910@cluster0.0exa02b.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.0exa02b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const products = client.db("test").collection("products");
//   // perform actions on the collection object
//   client.close();
// });
async function run() {
    try {
        const products = client.db("test").collection("products");
        app.get('/', async (req, res) => {
            const query = {};
            const cursor = products.find(query);
            const data = await cursor.toArray()
            res.send(data)
        })
        // filter api system
        app.get('/search', async (req, res) => {
            const name = req.query.name
            // const data = await products.find({
            //     "$or": [
            //         {"brand": {$regex: 'md'}}
            //     ]
            // }).toArray()
            // const data = await products.find({brand: {$regex: 'md'}}).toArray()
            const data = await products.find({brand : {$regex: 'MD'}}).toArray()
            console.log('data',data)
            res.json('aa')
        })


    } catch (e) {
        client.close();
    }
}
run().catch(console.dir)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})