interface IProps {
  name: string,
}

class Sort {
  name = async (array: IProps[]) => {
    array.sort((sr, fr) => {
      if (sr.name.toLowerCase() < fr.name.toLowerCase()) return -1;

      if (sr.name.toLowerCase() > fr.name.toLowerCase()) return 1;

      return 0;
    });

    return array;
  };
}

export default new Sort();
