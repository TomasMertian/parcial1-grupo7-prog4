import { makeApp } from './app';

const PORT = Number(process.env.PORT) || 3000;
const app = makeApp();

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
