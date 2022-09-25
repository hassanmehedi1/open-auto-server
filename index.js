const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://open-auto-admin:E6eTJIQfLtJOTrAZ@cluster0.hbpb5my.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run (){
   try{
     await client.connect();
     console.log("database connected");
     const dataCollection = client.db("open_auto").collection("form_data");

     //POST
     app.post("/submit", async (req, res) => {
       const submits = req.body;
       const result = await dataCollection.insertOne(submits);
       res.send(result);
     });

   } finally{}
   
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello OpenAuto!");
});

app.listen(port, () => {
  console.log(`OpenAuto listening on port ${port}`);
});
