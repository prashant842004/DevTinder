// const { MongoClient } = require('mongodb');

// const url = "mongodb+srv://prashantthakre712:5YGaCM3mt9v0hl1I@namastenode.t5uqi.mongodb.net/"

// const client = new MongoClient(url);

// // Database Name
// const dbName = 'HelloWorld';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('user');

//   // the following code examples can be pasted here...

// //   const data = {
    
// // FirstName:"Kishor",
// // LastName :"Thakre",
// // Age :"52",
// // City :"Nagpur",
// // Country :"India"
// //   }

// //   const insertResult = await collection.insertMany([data]);
// // console.log('Inserted documents =>', insertResult);

//   const findResult = await collection.find({FirstName : "Kishor"}).toArray();
// console.log('Found documents =>', findResult);

//   return 'done.';
// }



// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());