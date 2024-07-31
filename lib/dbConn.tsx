declare var globalThis: {
  _mongoClientPromise?: Promise<import('mongodb').MongoClient>;
};

import { MongoClient, ServerApiVersion  } from 'mongodb'

const uri = process.env.MONGODB_URI

let client
let clientPromise: any;

if (!uri) {
  throw new Error('Add MONGODB_URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri)
    globalThis._mongoClientPromise = client.connect()
  }
  clientPromise = globalThis._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise