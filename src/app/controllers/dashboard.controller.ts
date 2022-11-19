import { Request, Response } from 'express';
import DashboardService from '../services/dashboard.service';

class DashboardController {
  getValues = async (_: Request, response: Response) => {
    const dashboard = await DashboardService.getValues();

    response.status(200).json(dashboard);
  };
}

export default new DashboardController();
