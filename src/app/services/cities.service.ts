import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import * as yup from 'yup';
import Sort from '../utils/sort';
import CountriesService from './countries.service';
import StatesService from './states.service';

const prisma = new PrismaClient();

const schema: yup.SchemaOf<IDataCity> = yup.object().shape({
  name: yup.string().required().min(3),
  state_guid: yup.string().required().uuid(),
});

interface IDataCity {
  name: string;
  state_guid: string;
}

class CitiesService {
  create = async (payload: IDataCity) => {
    const state = await StatesService.getByGuid(payload.state_guid);

    if (!state) throw createHttpError.NotFound('STATE_NOT_FOUND');

    const validation = await schema.validate(payload);

    const city = await prisma.cities.create({
      data: validation,
    });

    return city;
  };

  getAll = async () => {
    const cities = await prisma.cities.findMany({});

    const payload = [];

    for (const city of cities) {
      const state = await StatesService.getByGuid(city.state_guid);

      const country = await CountriesService.getByGuid(state.country_guid);

      const data = {
        ...city,
        state: state.name,
        country: country.name,
      };

      payload.push(data);
    }

    await Sort.name(payload);

    return payload;
  };

  getAllByState = async (state_guid: string) => {
    const state = await StatesService.getByGuid(state_guid);

    if (!state) throw createHttpError.NotFound('STATE_NOT_FOUND');

    const cities = await prisma.cities.findMany({
      where: {
        state_guid,
      }
    });

    return cities;
  };

  getByGuid = async (guid: string) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid
      }
    });

    if (!city) throw createHttpError.NotFound('CITY_NOT_FOUND');

    return city;
  };

  update = async (guid: string, payload: IDataCity) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid
      }
    });

    if (!city) throw createHttpError.NotFound('CITY_NOT_FOUND');

    const state = await StatesService.getByGuid(payload.state_guid);

    if (!state) throw createHttpError.NotFound('STATE_NOT_FOUND');

    const validation = await schema.validate(payload);

    const updateCity = await prisma.cities.update({
      where: {
        guid
      },
      data: validation,
    });

    return updateCity;
  };

  delete = async (guid: string) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid
      }
    });

    if (!city) throw createHttpError.NotFound('CITY_NOT_FOUND');

    await prisma.cities.delete({
      where: {
        guid
      },
    });

    return true;
  };
}

export default new CitiesService();
