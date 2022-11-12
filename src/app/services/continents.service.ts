interface IDataContinent {
  name: string;
}

class ContinentsService {
  create = async (payload: IDataContinent) => {
    return payload;
  };
}

export default new ContinentsService();
