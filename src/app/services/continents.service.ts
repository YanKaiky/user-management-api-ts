import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';

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
}

export default new ContinentsService();
