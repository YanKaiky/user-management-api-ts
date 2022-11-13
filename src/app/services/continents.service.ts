import * as yup from 'yup';

interface IDataContinent {
  name: string;
}

const schema: yup.SchemaOf<IDataContinent> = yup.object().shape({
  name: yup.string().required().min(3),
});

class ContinentsService {
  create = async (payload: IDataContinent) => {
    const validation = schema.validate(payload);

    return validation;
  };
}

export default new ContinentsService();
