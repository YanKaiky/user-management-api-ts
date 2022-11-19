import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

interface IAuthData {
  email: string;
  password: string;
}

class AuthService {
  async login({ email, password }: IAuthData) {
    const ACCESS_TOKEN_SECRET = '2zZ266VF74kCkv1l9KRMVxRAFW3Bvl65zZwk5FPHHV08vyPcV8Y10WMZKJ==';

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw createHttpError.NotFound('Email address or password incorrect');

    if (!user.password) throw createHttpError.NotFound('Registration not finalized');

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) throw createHttpError.Unauthorized('Email address or password incorrect');

    const token = {
      token: sign({ name: user.name, email: user.email },
        ACCESS_TOKEN_SECRET,
        {
          subject: user.guid,
          expiresIn: '12h',
        }
      )
    };

    return token;
  }
}

export default new AuthService();
