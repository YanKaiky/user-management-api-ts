import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';
import Sort from '../utils/sort';
import * as bcrypt from 'bcryptjs';
import CitiesService from './cities.service';

const prisma = new PrismaClient();

const schema: yup.SchemaOf<ICreateDataUser> = yup.object().shape({
  name: yup.string().required().min(2),
  last_name: yup.string().optional().min(2),
  password: yup.string().required().min(8),
  email: yup.string().required().email(),
  cpf: yup.string().required().length(11),
  birth_date: yup.date().required(),
  city_guid: yup.string().required().uuid(),
});

interface ICreateDataUser {
  name: string;
  last_name?: string;
  password: string;
  email: string;
  cpf: string;
  birth_date: Date;
  city_guid: string;
}

const schemaUpdate: yup.SchemaOf<IUpdateDataUser> = yup.object().shape({
  name: yup.string().required().min(2),
  last_name: yup.string().optional().min(2),
  password: yup.string().optional().min(8),
  email: yup.string().required().email(),
  cpf: yup.string().required().length(11),
  birth_date: yup.date().required(),
  city_guid: yup.string().required().uuid(),
});

interface IUpdateDataUser {
  name: string;
  last_name?: string;
  password?: string;
  email: string;
  cpf: string;
  birth_date: Date;
  city_guid: string;
}

class UsersService {
  create = async (payload: ICreateDataUser) => {
    const continent = await CitiesService.getByGuid(payload.city_guid);

    if (!continent) return { message: 'CITY_NOT_FOUND' };

    payload.birth_date = new Date(payload.birth_date);

    const validation = await schema.validate(payload);

    payload.password = bcrypt.hashSync(payload.password, 8);

    const user = await prisma.users.create({
      data: validation,
    });

    return user;
  };

  getAll = async () => {
    const users = await prisma.users.findMany({});

    await Sort.name(users);

    return users;
  };

  getAllByCity = async (city_guid: string) => {
    const city = await CitiesService.getByGuid(city_guid);

    if (!city) return { message: 'CITY_NOT_FOUND' };

    const users = await prisma.users.findMany({
      where: {
        city_guid,
      }
    });

    return users;
  };

  getByGuid = async (guid: string) => {
    const user = await prisma.users.findUnique({
      where: {
        guid
      }
    });

    if (!user) return { message: 'USER_NOT_FOUND' };

    return user;
  };

  update = async (guid: string, payload: IUpdateDataUser) => {
    const user = await prisma.users.findUnique({
      where: {
        guid
      }
    });

    if (!user) return { message: 'USER_NOT_FOUND' };

    const country = await CitiesService.getByGuid(payload.city_guid);

    if (!country) return { message: 'CITY_NOT_FOUND' };

    payload.birth_date = new Date(payload.birth_date);

    if (payload.password) payload.password = bcrypt.hashSync(payload.password, 8);

    const validation = await schemaUpdate.validate(payload);

    const updateState = await prisma.users.update({
      where: {
        guid
      },
      data: validation,
    });

    return updateState;
  };

  delete = async (guid: string) => {
    const user = await prisma.users.findUnique({
      where: {
        guid
      }
    });

    if (!user) return { message: 'USER_NOT_FOUND' };

    await prisma.users.delete({
      where: {
        guid
      },
    });

    return true;
  };
}

export default new UsersService();
