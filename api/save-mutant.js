// api/save-mutant.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://leogsex2001:tU2WUAWGZ8XWN3r9@cluster0.ztaekit.mongodb.net/?retryWrites=true&w=majority'; // URI de tu base de datos MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('mutantDB'); // Nombre de la base de datos
            const collection = database.collection('mutants'); // Nombre de la colección

            const mutant = req.body;

            // Inserta el nuevo mutante en la base de datos
            await collection.insertOne(mutant);

            res.status(200).json({ message: 'Mutante guardado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al guardar el mutante', error });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
