import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DashboardService {
  getValues = async () => {
    const countries = await prisma.countries.findMany({});
    const states = await prisma.states.findMany({});
    const cities = await prisma.cities.findMany({});
    const users = await prisma.users.findMany({});

    const data = {
      countries: countries.length,
      states: states.length,
      cities: cities.length,
      users: users.length,
    };

    return data;
  };
}

export default new DashboardService();
