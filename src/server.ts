import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationRoutes } from './routes/specification.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
})

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRoutes);

app.post("/courses", (req, res) => {
  const { name } = req.body;
  return res.json({ name });
});

app.listen(3333, () => console.log('Server is running!'));
