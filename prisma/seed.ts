import Continents from './seeders/continents';

async function seed() {
  await Continents.continents();
}

seed();
