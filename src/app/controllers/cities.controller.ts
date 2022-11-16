import { Request, Response } from 'express';
import CitiesService from '../services/cities.service';
import * as yup from 'yup';

class CitiesController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
        state_guid: request.body.state_guid,
      };

      const city = await CitiesService.create(payload);

      response.status(201).json(city);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const state_guid = request.query.state_guid as string;

      let cities;

      if (state_guid) cities = await CitiesService.getAllByState(state_guid);

      if (!state_guid) cities = await CitiesService.getAll();

      response.status(200).json(cities);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getByGuid(request: Request, response: Response) {
    const guid = request.params.guid;

    const cities = await CitiesService.getByGuid(guid);

    response.status(200).json(cities);
  }

  async update(request: Request, response: Response) {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        state_guid: request.body.state_guid,
      };

      const city = await CitiesService.update(guid, payload);

      response.status(200).json(city);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async delete(request: Request, response: Response) {
    const guid = request.params.guid;

    const city = await CitiesService.delete(guid);

    response.status(200).json(city);
  }
}

export default new CitiesController();
