import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface IPropsCities {
  guid: string
}

class Users {
  static users = async (cities: IPropsCities[]) => {
    const users = [
      {
        name: 'Yan Kaiky',
        last_name: 'Augusto dos Santos',
        password: bcrypt.hashSync('yankaikys', 8),
        email: 'yankaikys@gmail.com',
        cpf: '13424551937',
        birth_date: new Date('2002-12-22T23:15'),
        city_guid: cities[0].guid,
      },
      {
        name: 'Miles',
        last_name: 'Morales',
        password: bcrypt.hashSync('miles', 8),
        email: 'yan.santos@towty.com.br',
        cpf: '57520593053',
        birth_date: new Date('2000-12-22T00:00'),
        city_guid: cities[1].guid,
      },
      {
        name: 'Camila',
        last_name: 'Cunha',
        password: bcrypt.hashSync('camila', 8),
        email: 'camila@gmail.com',
        cpf: '26965804050',
        birth_date: new Date('2001-11-21T00:00'),
        city_guid: cities[2].guid,
      },
      {
        name: 'Flaviane',
        last_name: 'Pires',
        password: bcrypt.hashSync('flaviane', 8),
        email: 'flaviane@gmail.com',
        cpf: '08197375003',
        birth_date: new Date('2002-11-12T00:00'),
        city_guid: cities[3].guid,
      },
      {
        name: 'Thiago',
        last_name: 'Silva',
        password: bcrypt.hashSync('thiago', 8),
        email: 'thiago@gmail.com',
        cpf: '08197375003',
        birth_date: new Date('2002-11-12T00:00'),
        city_guid: cities[3].guid,
      },
    ];

    for (const data of users) {
      await prisma.users.create({ data });
    }
  };
}

export default Users;
