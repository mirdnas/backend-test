import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import {getManager} from "typeorm";
// import {validate} from "class-validator";
// import { User } from './entity/User';

class AuthController {

  async authenticate( request : Request, response : Response ){
    const repository = getRepository(Users);
    const { email, password } = request.body;

    const user = await repository.findOne({where: {email}});

    if(!user){
      return response.status(401).send();
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
      return response.status(401).send();
    }

    const token = jwt.sign( { id: user.id } , 'osegredo', { expiresIn: '1d' } );

    return response.json({
      token
    })

  }
}

export default new AuthController();
