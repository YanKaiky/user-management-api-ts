import express from 'express';

const app = express();

app.get('/', (_, response) => response.send({ datetime: new Date().toLocaleString('pt-BR') }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
