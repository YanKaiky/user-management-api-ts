import { Request, Response } from 'express';
import StatesService from '../services/states.service';
import * as yup from 'yup';

class StatesController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
        uf: request.body.uf,
        country_guid: request.body.country_guid,
      };

      const state = await StatesService.create(payload);

      response.status(201).json(state);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const country_guid = request.query.country_guid as string;

      let states;

      if (country_guid) states = await StatesService.getAllByCountry(country_guid);

      if (!country_guid) states = await StatesService.getAll();

      response.status(200).json(states);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getByGuid(request: Request, response: Response) {
    const guid = request.params.guid;

    const states = await StatesService.getByGuid(guid);

    response.status(200).json(states);
  }

  async update(request: Request, response: Response) {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        uf: request.body.uf,
        country_guid: request.body.country_guid,
      };

      const state = await StatesService.update(guid, payload);

      response.status(200).json(state);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async delete(request: Request, response: Response) {
    const guid = request.params.guid;

    const state = await StatesService.delete(guid);

    response.status(200).json(state);
  }
}

export default new StatesController();
