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
}

export default new ContinentsController();
