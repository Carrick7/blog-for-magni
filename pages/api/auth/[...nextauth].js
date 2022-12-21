import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/userModel';
import db from '../../../utils/db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req){
        await db.connect();

        //finding user
        const result = await User.findOne({email: credentials.email})
        
        if(!result){
          throw new Error("email address not recognised")
        }
        if(result.isAdmin === false){
          throw new Error("Not an Admin")
        }

        //disconnect db
        await db.disconnect();
        
        //checking pass
        const checkPassword = await compare(credentials.password, result.password);

        if(!checkPassword || result.email !== credentials.email){
          throw new Error("email or password not recognised, please try again");      
        }
        return result;
      }       
    })
  ]
});