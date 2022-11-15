import { Request, Response } from 'express';
import CountriesService from '../services/countries.service';
import * as yup from 'yup';

class CountriesController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
        continent_guid: request.body.continent_guid,
      };

      const country = await CountriesService.create(payload);

      response.status(201).json(country);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const continent_guid = request.query.continent_guid as string;

      let countries;

      if (continent_guid) countries = await CountriesService.getAllByContinent(continent_guid);

      if (!continent_guid) countries = await CountriesService.getAll();

      response.status(200).json(countries);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async getByGuid(request: Request, response: Response) {
    const guid = request.params.guid;

    const countries = await CountriesService.getByGuid(guid);

    response.status(200).json(countries);
  }

  async update(request: Request, response: Response) {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        continent_guid: request.body.continent_guid,
      };

      const country = await CountriesService.update(guid, payload);

      response.status(200).json(country);
    } catch (error) {
      const yupError = error as yup.ValidationError;

      response.json({ message: yupError.message });
    }
  }

  async delete(request: Request, response: Response) {
    const guid = request.params.guid;

    const country = await CountriesService.delete(guid);

    response.status(200).json(country);
  }
}

export default new CountriesController();
