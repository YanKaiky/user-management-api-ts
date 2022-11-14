import { PrismaClient } from '@prisma/client';
import Countries from './countries';

const prisma = new PrismaClient();

class Continents {
  static continents = async () => {
    const continents = [
      {
        name: 'Africa',
      },
      {
        name: 'Asia',
      },
      {
        name: 'Australia',
      },
      {
        name: 'Central America',
      },
      {
        name: 'Europe',
      },
      {
        name: 'North America',
      },
      {
        name: 'South America',
      },
    ];

    const payload = [];

    for (const data of continents) {
      const value = await prisma.continents.create({ data });

      payload.push(value);
    }

    await Countries.countries(payload);
  };
}

export default Continents;
