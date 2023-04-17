var express = require('express');
var router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://dobrien:BXh29g7zeZKAFEZj@mongocluster.55hvazl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(
  uri, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1
  }
);


async function queryItems() {
  try {
    await client.connect()
    console.log('Connected to MongoDB Atlas');

    const collection = client.db("mongoInstance").collection("items");
    const result = await collection.find().toArray()
    console.log(result)
    return result
  } catch(err) {
    console.log(err)
  } finally {
    console.log("closing connection...")
    await client.close();
  }
}

async function queryItemById(item_id){
  try {
    await client.connect()
    console.log('Connected to MongoDB Atlas');

    const collection = client.db("mongoInstance").collection("items");
    const query = { _id: new ObjectId(item_id) };
    const result = await collection.findOne(query)
    console.log(result)
  } catch(err) {
    console.log(err)
  } finally {
    console.log("closing connection...")
    await client.close();
  }
}

async function addItem(item) {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const collection = client.db("mongoInstance").collection("items");
    const result = await collection.insertOne(item);
    console.log(result.insertedId);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing connection...")
    await client.close();
  }
}

async function updateItem(item_id, item) {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const collection = client.db("mongoInstance").collection("items");
    const filter = { _id: new ObjectId(item_id) };
    const update = { $set: { 
      item_name: item.item_name,
      quantity: item.quantity
    }};
    const result = await collection.updateOne(filter, update);
    console.log(result.modifiedCount);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

async function deleteItemById(item_id){
  try {
    await client.connect()
    console.log('Connected to MongoDB Atlas');

    const collection = client.db("mongoInstance").collection("items");
    const query = { _id: new ObjectId(item_id) };
    const result = await collection.deleteOne(query)
    console.log(result)
  } catch(err) {
    console.log(err)
  } finally {
    console.log("closing connection...")
    await client.close();
  }
}


async function test(){
  console.log("find all:")
  await queryItems()
  
  console.log("find one:")
  await queryItemById("641f391d543016fac1ffe048")

  console.log("add record:")
  await addItem({
    item_name: "newest item 3",
    quantity: 9,
    img_url: "https://placeholder.com/150"
  })

  console.log("update item: ")
  await updateItem("641f391d543016fac1ffe048",{
    item_name: "brand spankin new",
    quantity: 1
  })

  console.log("find all:")
  await queryItems()

  console.log("delete item:")
  await deleteItemById("641f391d543016fac1ffe048")

  console.log("confirm delete:")
  await queryItemById("641f391d543016fac1ffe048")
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addTwo', (req, res) => {
    res.send({ 
        result: parseInt(req.body.a) + parseInt(req.body.b)
    });
}); 

router.post('/items', async (req, res) => {
  await addItem(req.body)
  res.send({ 
      result: "Add new"
  });
}); 

router.get('/items', async (req, res) => {
  const result = await queryItems()
  res.send({ 
      result: JSON.stringify(result)
  });
}); 

router.get('/items/:item_id', (req, res) => {
  const user_id = req.params.item_id;

  res.send({
    result: `Retrieve item ${user_id}`
  })
});

router.patch('/items/:item_id', async (req, res) => {
  const item_id = req.params.item_id;
  const item = req.body.message

  await updateItem(item_id, item)

  res.send({
    result: 'Success'
  })
});

router.delete('/items/:item_id', async (req, res) => {
  const item_id = req.params.item_id;
  await deleteItemById(item_id)

  res.send({
    result: `Deleted`
  })
});

module.exports = router;