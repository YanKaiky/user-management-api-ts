import { PrismaClient } from '@prisma/client';
import States from './states';

const prisma = new PrismaClient();

interface IPropsContinents {
  guid: string
}

class Countries {
  static countries = async (continents: IPropsContinents[]) => {
    const countries = [
      {
        name: 'Unites States of America',
        continent_guid: continents[4].guid,
      },
      {
        name: 'Brazil',
        continent_guid: continents[6].guid,
      },
      {
        name: 'Canada',
        continent_guid: continents[4].guid,
      },
      {
        name: 'Japan',
        continent_guid: continents[1].guid,
      },
      {
        name: 'Norway',
        continent_guid: continents[3].guid,
      },
    ];

    const payload = [];

    for (const data of countries) {
      const value = await prisma.countries.create({ data });

      payload.push(value);
    }

    await States.states(payload);
  };
}

export default Countries;
