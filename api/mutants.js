// pages/api/mutants.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

if (!client) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const mutant = req.body;

    try {
      await client.connect();
      const database = client.db('mgg');
      const mutants = database.collection('mutants');
      const result = await mutants.insertOne(mutant);
      res.status(201).json({ message: 'Mutant added!', result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await client.close();
    }
  } else if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('mgg');
      const mutants = database.collection('mutants');
      const allMutants = await mutants.find({}).toArray();
      res.status(200).json(allMutants);
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
