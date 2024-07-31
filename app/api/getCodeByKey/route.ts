// getCodeByKey.ts

import clientPromise from "@/lib/dbConn";
import type { MongoClient } from "mongodb";

// this ROUTE handler connects to the db and finds the code associated with the given key/filename
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  if(!key) throw new Error("No key specified.")
  // key exists
  try {
    const client: MongoClient = await clientPromise;
    const db = await client.db("test").collection("code")
    const file = await db.findOne({ Key: key })
    if(!file) throw new Error("No code found for the specified key.")
    return new Response(file.code, { headers: { 'Content-Type': 'text/plain' } })
  } catch (error) {
    console.error("Error fetching code:", error)
    return new Response((error as Error).message, { status: 500 })
  }
}