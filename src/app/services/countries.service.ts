import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';
import Sort from '../utils/sort';

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
    const continent = await prisma.continents.findUnique({
      where: {
        guid: payload.continent_guid
      }
    });

    if (!continent) return { message: 'CONTINENT_NOT_FOUND' };

    const validation = await schema.validate(payload);

    const country = await prisma.countries.create({
      data: validation,
    });

    return country;
  };

  getAll = async () => {
    const countries = await prisma.countries.findMany({});

    await Sort.name(countries);

    return countries;
  };

  getAllByContinent = async (continent_guid: string) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid: continent_guid,
      },
    });

    if (!continent) return { message: 'CONTINENT_NOT_FOUND' };

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

    if (!country) return { message: 'COUNTRY_NOT_FOUND' };

    return country;
  };

  update = async (guid: string, payload: IDataCountry) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid
      }
    });

    if (!country) return { message: 'COUNTRY_NOT_FOUND' };

    const continent = await prisma.continents.findUnique({
      where: {
        guid: payload.continent_guid
      }
    });

    if (!continent) return { message: 'CONTINENT_NOT_FOUND' };

    const validation = await schema.validate(payload);

    const updateContinent = await prisma.countries.update({
      where: {
        guid
      },
      data: validation,
    });

    return updateContinent;
  };

  delete = async (guid: string) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid
      }
    });

    if (!country) return { message: 'COUNTRY_NOT_FOUND' };

    await prisma.countries.delete({
      where: {
        guid
      },
    });

    return true;
  };
}

export default new CountriesService();
