'use server'
import type { MongoClient } from 'mongodb';
import clientPromise from "@/lib/dbConn";

 
export async function updateCode(prevState: any, formData: FormData) {
  try {
    console.log("Updating code...")
    const { code, filename } = {
      code: formData.get('code'),
      filename: formData.get('filename'),
    }
    const client: MongoClient = await clientPromise;
    const db = await client.db("test").collection("code")
    const updateFileRes = await db.updateOne({ Key: filename }, { "$set": { code } }, { upsert: true })
    console.log('updateFileRes:', updateFileRes)
    return {...prevState, message: 'Code updated successfully', filename, code }
  } catch(err) {
    console.error('Error updating code:', err)
    // throw new Error('Error updating code')
    return {
      ...prevState,
      message: "Error updating code.",
    }
  }
}