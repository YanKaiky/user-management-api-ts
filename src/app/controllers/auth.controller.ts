import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  login = async (request: Request, response: Response) => {
    const authorization = request.headers.authorization as string;

    const auth = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');

    const payload = {
      email: auth[0],
      password: auth[1],
    };

    const token = await AuthService.login(payload);

    response.status(200).json(token);
  };
}

export default new AuthController();
