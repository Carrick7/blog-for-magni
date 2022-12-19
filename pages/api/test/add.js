import db from '../../../utils/db';
import Test from '../../../models/testModel';

export default async function addTest(req, res) {

      //ensuring db is connected
      await db.connect();
      
      //validation
      if(!req.body.name){
        return res.status(400).send(
          {message: 'missing name field'});
      }
      if(!req.body.email){
        return res.status(400).send(
          {message: 'missing email field'});
      }
      
      //Creating new document in collection
      const test = await Test.create(req.body);
      console.log('Created New User');
      
      await db.disconnect();

      return res.status(201).json({ test });
  }