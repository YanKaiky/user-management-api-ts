import { Request, Response } from 'express';
import ContinentsService from '../services/continents.service';

class ContinentsController {
  async create(request: Request, response: Response) {
    const payload = {
      name: request.body.name,
    };

    const continent = await ContinentsService.create(payload);

    response.status(201).json(continent);
  }
}

export default new ContinentsController();
