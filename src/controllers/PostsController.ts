import { Request, Response } from 'express';
import { Posts } from '../entity/Posts';
import { getRepository } from 'typeorm';
// import {getManager} from "typeorm";
// import {validate} from "class-validator";
// import { User } from './entity/User';

class PostController {

  async index( request : Request, response : Response ){
    const userId = request.userId
    return response.json({ message: userId });
  }

  async store( request : Request, response : Response ){
    const repository = getRepository(Posts);

    const { id, title, content, userId, published, updated } = request.body;

    const data = {
      id,
      title,
      content,
      userId,
      published,
      updated
    }

    const post =  await repository.create(data);

    await repository.save(post);

    return response.json(post);

  }

}

export default new PostController();
