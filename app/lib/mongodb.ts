import { MongoClient, ServerApiVersion } from 'mongodb'

const atlasURI = `mongodb+srv://tristan:${process.env.MONGODB_ATLAS_PW}@sachse-site.rc7rjk1.mongodb.net/?retryWrites=true&w=majority`
const localURI = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client = new MongoClient(atlasURI, options);
let clientPromise: Promise<MongoClient>

async function run() {
  try {
    clientPromise = client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

export default clientPromise!