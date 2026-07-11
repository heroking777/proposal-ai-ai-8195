import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface Application {
  name: string;
  email: string;
  yearsOfExperience: number;
  skills: string[];
}

const applications: Application[] = [];

app.post('/apply', (req: Request, res: Response) => {
  const { name, email, yearsOfExperience, skills } = req.body;

  if (!name || !email || typeof yearsOfExperience !== 'number' || !Array.isArray(skills)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const application: Application = { name, email, yearsOfExperience, skills };
  applications.push(application);

  res.status(201).json({ message: 'Application received successfully', application });
});

app.get('/applications', (req: Request, res: Response) => {
  res.json(applications);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});