import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import * as yup from 'yup';
import Sort from '../utils/sort';

const prisma = new PrismaClient();

const schema: yup.SchemaOf<IDataContinent> = yup.object().shape({
  name: yup.string().required().min(3),
});

interface IDataContinent {
  name: string;
}

class ContinentsService {
  create = async (payload: IDataContinent) => {
    const validation = await schema.validate(payload);

    const continent = await prisma.continents.create({
      data: validation,
    });

    return continent;
  };

  getAll = async () => {
    const continents = await prisma.continents.findMany({});

    await Sort.name(continents);

    return continents;
  };

  getByGuid = async (guid: string) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid
      }
    });

    if (!continent) throw createHttpError.NotFound('CONTINENT_NOT_FOUND');

    return continent;
  };

  update = async (guid: string, payload: IDataContinent) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid
      }
    });

    if (!continent) throw createHttpError.NotFound('CONTINENT_NOT_FOUND');

    const validation = await schema.validate(payload);

    const updateContinent = await prisma.continents.update({
      where: {
        guid
      },
      data: validation,
    });

    return updateContinent;
  };

  delete = async (guid: string) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid
      }
    });

    if (!continent) throw createHttpError.NotFound('CONTINENT_NOT_FOUND');

    await prisma.continents.delete({
      where: {
        guid
      },
    });

    return true;
  };
}

export default new ContinentsService();
