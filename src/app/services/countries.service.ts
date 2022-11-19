import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import * as yup from 'yup';
import Sort from '../utils/sort';
import ContinentsService from './continents.service';

const prisma = new PrismaClient();

const schema: yup.SchemaOf<IDataCountry> = yup.object().shape({
  name: yup.string().required().min(3),
  continent_guid: yup.string().required().uuid(),
});

interface IDataCountry {
  name: string;
  continent_guid: string;
}

class CountriesService {
  create = async (payload: IDataCountry) => {
    const continent = await ContinentsService.getByGuid(payload.continent_guid);

    if (!continent) throw createHttpError.NotFound('CONTINENT_NOT_FOUND');

    const validation = await schema.validate(payload);

    const country = await prisma.countries.create({
      data: validation,
    });

    return country;
  };

  getAll = async () => {
    const countries = await prisma.countries.findMany({});

    const payload = [];

    for (const country of countries) {
      const continent = await ContinentsService.getByGuid(country.continent_guid);

      const data = {
        ...country,
        continent: continent.name,
      };

      payload.push(data);
    }

    await Sort.name(payload);

    return payload;
  };

  getAllByContinent = async (continent_guid: string) => {
    const continent = await ContinentsService.getByGuid(continent_guid);

    if (!continent) throw createHttpError.NotFound('CONTINENT_NOT_FOUND');

    const countries = await prisma.countries.findMany({
      where: {
        continent_guid,
      }
    });

    return countries;
  };

  getByGuid = async (guid: string) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid
      }
    });

    if (!country) throw createHttpError.NotFound('COUNTRY_NOT_FOUND');

    return country;
  };

  update = async (guid: string, payload: IDataCountry) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid
      }
    });

    if (!country) throw createHttpError.NotFound('COUNTRY_NOT_FOUND');

    const continent = await ContinentsService.getByGuid(payload.continent_guid);

    if (!continent) throw createHttpError.NotFound('CONTINENT_NOT_FOUND');

    const validation = await schema.validate(payload);

    const updateCountry = await prisma.countries.update({
      where: {
        guid
      },
      data: validation,
    });

    return updateCountry;
  };

  delete = async (guid: string) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid
      }
    });

    if (!country) throw createHttpError.NotFound('COUNTRY_NOT_FOUND');

    await prisma.countries.delete({
      where: {
        guid
      },
    });

    return true;
  };
}

export default new CountriesService();
