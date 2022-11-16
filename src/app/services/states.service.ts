import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';
import Sort from '../utils/sort';
import CountriesService from './countries.service';

const prisma = new PrismaClient();

const schema: yup.SchemaOf<IDataCountry> = yup.object().shape({
  name: yup.string().required().min(3),
  uf: yup.string().required().length(2),
  country_guid: yup.string().required().uuid(),
});

interface IDataCountry {
  name: string;
  uf: string;
  country_guid: string;
}

class StatesService {
  create = async (payload: IDataCountry) => {
    const continent = await CountriesService.getByGuid(payload.country_guid);

    if (!continent) return { message: 'COUNTRY_NOT_FOUND' };

    const validation = await schema.validate(payload);

    const state = await prisma.states.create({
      data: validation,
    });

    return state;
  };

  getAll = async () => {
    const states = await prisma.states.findMany({});

    await Sort.name(states);

    return states;
  };

  getAllByCountry = async (country_guid: string) => {
    const country = await CountriesService.getByGuid(country_guid);

    if (!country) return { message: 'COUNTRY_NOT_FOUND' };

    const states = await prisma.states.findMany({
      where: {
        country_guid,
      }
    });

    return states;
  };

  getByGuid = async (guid: string) => {
    const state = await prisma.states.findUnique({
      where: {
        guid
      }
    });

    if (!state) return { message: 'COUNTRY_NOT_FOUND' };

    return state;
  };

  update = async (guid: string, payload: IDataCountry) => {
    const state = await prisma.states.findUnique({
      where: {
        guid
      }
    });

    if (!state) return { message: 'COUNTRY_NOT_FOUND' };

    const continent = await CountriesService.getByGuid(payload.country_guid);

    if (!continent) return { message: 'COUNTRY_NOT_FOUND' };

    const validation = await schema.validate(payload);

    const updateContinent = await prisma.states.update({
      where: {
        guid
      },
      data: validation,
    });

    return updateContinent;
  };

  delete = async (guid: string) => {
    const state = await prisma.states.findUnique({
      where: {
        guid
      }
    });

    if (!state) return { message: 'COUNTRY_NOT_FOUND' };

    await prisma.states.delete({
      where: {
        guid
      },
    });

    return true;
  };
}

export default new StatesService();
