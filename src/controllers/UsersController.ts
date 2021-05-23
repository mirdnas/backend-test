import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { getRepository } from 'typeorm';
import { validateEmail } from '../helpers/helpers'
import jwt from 'jsonwebtoken';
// import {getManager} from "typeorm";
// import {validate} from "class-validator";
// import { User } from './entity/User';

class UserController {

  async index( request : Request, response : Response ){
    const repository = getRepository(Users);
    const userId = request.userId

    const allUsers = await repository.find();
    return response.json( allUsers );
  }

  async store( request : Request, response : Response ){
    const repository = getRepository(Users);
    const { displayName, email, password, image } = request.body;

    if( displayName.length < 8 ) {
      return response.status(400)
        .json({message: "displayName length must be at least 8 characters long"});
    }


    if( !email  ){
      return response.status(400)
        .json({message: "email is required"});
    }

    if( !validateEmail(email) ){
      return response.status(400)
        .json({message: 'email must be a valid email' });
    }

    if( !password ){
      return response.status(400)
        .json({message: 'password is required' });
    }

    if( password.length < 6  ){
      return response.status(400)
        .json({message: 'password length must be 6 characters long' });
    }

    // if( password.length < 6 || password.length > 6 ){
    //   return response.status(409).send('senha deverá conter 6 caracteres');
    // }

    const userExist = await repository.findOne({where: {email}});

    if( userExist ){
      return response.status(409).json({message:'Usuário já existe'});
    }

    const user = repository.create({
      display_name : displayName,
      email,
      password,
      image
    });

    await repository.save(user);

    const token = jwt.sign( { id: user.id } , 'osegredo', { expiresIn: '1d' } );

    return response.status(201).json({
      token
    })

  }
}

export default new UserController();
