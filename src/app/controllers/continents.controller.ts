import { Request, Response } from 'express';
import ContinentsService from '../services/continents.service';
import * as yup from 'yup';

class ContinentsController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
      };

      const continent = await ContinentsService.create(payload);

      response.status(201).json(continent);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getAll(_: Request, response: Response) {
    const continents = await ContinentsService.getAll();

    response.status(200).json(continents);
  }

  async getByGuid(request: Request, response: Response) {
    const guid = request.params.guid;

    const continents = await ContinentsService.getByGuid(guid);

    response.status(200).json(continents);
  }

  async update(request: Request, response: Response) {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
      };

      const continent = await ContinentsService.update(guid, payload);

      response.status(200).json(continent);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async delete(request: Request, response: Response) {
    const guid = request.params.guid;

    const continent = await ContinentsService.delete(guid);

    response.status(200).json(continent);
  }
}

export default new ContinentsController();
