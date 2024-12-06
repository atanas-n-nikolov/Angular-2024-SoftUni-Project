import { Router } from 'express';
import { allAdopt, allLostAndFound, animalById, create, findAll, latestAdopt ,latestLostAndFound } from '../services/animalService.js';

const animalController = Router();

animalController.get('/', async (req, res) => {
  const animals = await findAll();
  res.status(201).json(animals);
});

animalController.post('/create', async (req, res) => {
  const animalData = req.body;
  try {
    const createdAnimal = await create(animalData);
    res.status(201).json(createdAnimal);
  } catch (error) {
    console.error('Error creating animal:', error.message);
    res.status(500).json({ message: 'Failed to create animal.' });
  }
});

animalController.get('/latestAdopt', async (req, res) => {
  const animals = await latestAdopt();
  res.status(201).json(animals);
});

animalController.get('/latestFound', async (req, res) => {
  const animals = await latestLostAndFound();
  res.status(201).json(animals);
});

animalController.get('/adopt', async (req, res) => {
  const animals = await allAdopt();
  res.status(201).json(animals);
})

animalController.get('/lostandfound', async (req, res) => {
  const animals = await allLostAndFound();
  res.status(201).json(animals);
})

animalController.get('/:id/details', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const animal = await animalById(id);
  res.status(201).json(animal);
})

export default animalController;