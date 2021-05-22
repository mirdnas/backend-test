import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { getRepository } from 'typeorm';
// import {getManager} from "typeorm";
// import {validate} from "class-validator";
// import { User } from './entity/User';

class UserController {

  async index( request : Request, response : Response ){
    const userId = request.userId
    return response.json({ message: userId });
  }

  async store( request : Request, response : Response ){
    const repository = getRepository(Users);
    const { displayName, email, password, image } = request.body;

    const userExist = await repository.findOne({where: {email}});

    if( userExist ){
      return response.status(409).send();
    }

    const user = repository.create({
      display_name : displayName,
      email,
      password,
      image
    });

    await repository.save(user);

    return response.json(user);
    // let user = new User();
    // user.displayName = 'sandro jonathan';
    // user.email = 'fale@comsandro.com.br';
    // user.password = 'senhadosandro';
    // user.image = 'http://placehold.it/180x130';
    // const errors = await validate(user);
    // console.log('meus erros',errors);
    // if (errors.length > 0) {
    //   throw new Error(`Validation failed!`);
    // } else {
    //   await getManager().save(user);
    // }
  }
}

export default new UserController();
