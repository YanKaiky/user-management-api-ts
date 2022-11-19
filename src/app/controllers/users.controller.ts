import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import * as yup from 'yup';

class UsersController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
        last_name: request.body.last_name,
        password: request.body.password,
        email: request.body.email,
        cpf: request.body.cpf,
        birth_date: request.body.birth_date,
        city_guid: request.body.city_guid,
      };

      const user = await UsersService.create(payload);

      response.status(201).json(user);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const city_guid = request.query.city_guid as string;

      let users;

      if (city_guid) users = await UsersService.getAllByCity(city_guid);

      if (!city_guid) users = await UsersService.getAll();

      response.status(200).json(users);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getByGuid(request: Request, response: Response) {
    const guid = request.params.guid;

    const user = await UsersService.getByGuid(guid);

    response.status(200).json(user);
  }

  async update(request: Request, response: Response) {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        last_name: request.body.last_name,
        password: request.body.password,
        email: request.body.email,
        cpf: request.body.cpf,
        birth_date: request.body.birth_date,
        city_guid: request.body.city_guid,
      };

      const user = await UsersService.update(guid, payload);

      response.status(200).json(user);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async delete(request: Request, response: Response) {
    const guid = request.params.guid;

    const user = await UsersService.delete(guid);

    response.status(200).json(user);
  }
}

export default new UsersController();
