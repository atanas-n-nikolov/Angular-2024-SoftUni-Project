import { Router } from 'express';
import { allAdopt, allLostAndFound, animalById, create, findAll, latestAdopt ,latestLostAndFound, editAnimal, deleteAnimal, likedAnimal, unlikeAnimal } from '../services/animalService.js';

const animalController = Router();

animalController.get('/', async (req, res) => {
  try {
    const animals = await findAll();
    res.status(201).json(animals);
  } catch (error) {
    console.error('Error fetching animals:', err);
    res.status(500).json({ message: 'Failed to fetch animals. Please try again later.' });
  }
});

animalController.post('/create', async (req, res) => {
  const animalData = req.body;
  try {
    const createdAnimal = await create(req.user._id, animalData);
    res.status(201).json(createdAnimal);
  } catch (error) {
    console.error('Error creating animal:', error.message);
    res.status(500).json({ message: 'Failed to create animal. Please try again later.' });
  }
});

animalController.get('/latestAdopt', async (req, res) => {
  try {
    const animals = await latestAdopt();
    res.status(200).json(animals);
  } catch (error) {
    console.error('Error fetching latest adoptable animals:', err);
    res.status(500).json({ message: 'Failed to fetch latest adoptable animals.' });
  }
});

animalController.get('/latestFound', async (req, res) => {
  try {
    const animals = await latestLostAndFound();
    res.status(200).json(animals);
  } catch (error) {
    console.error('Error fetching latest found animals:', err);
    res.status(500).json({ message: 'Failed to fetch latest found animals.' });
  }

});

animalController.get('/adopt', async (req, res) => {
  try {
    const animals = await allAdopt();
    res.status(200).json(animals);
  } catch (error) {
    console.error('Error fetching adoptable animals:', err);
    res.status(500).json({ message: 'Failed to fetch adoptable animals.' });
  }

})

animalController.get('/lostandfound', async (req, res) => {
  try {
    const animals = await allLostAndFound();
    res.status(200).json(animals);
  } catch (error) {
    console.error('Error fetching lost and found animals:', err);
    res.status(500).json({ message: 'Failed to fetch lost and found animals.' });
  }

})

animalController.get('/:id/details', async (req, res) => {
  const id = req.params.id;
  try {
    const animal = await animalById(id);
    res.status(200).json(animal);
  } catch (error) {
    console.error('Error fetching animal details:', err);
    res.status(500).json({ message: 'Failed to fetch animal details.' });
  }

})

animalController.put('/:id/edit', async (req, res) => {
  const id = req.params.id;
  const animalData = req.body;

  try {
    await editAnimal(id, animalData);
    res.status(200).end()
  } catch (error) {
    console.error('Error editing animal:', err);
    res.status(400).json({ message: 'Failed to edit animal. ' + err.message });  }
})

animalController.delete('/:id/delete', async (req, res) => {
  const id = req.params.id;
  try {
    await deleteAnimal(id);
    res.status(200).end()
  } catch (error) {
    console.error('Error deleting animal:', err);
    res.status(400).json({ message: 'Failed to delete animal. ' + err.message });
  }
})

animalController.post('/:id/like', async (req, res) => {
  try {
    const updateAnimal = await likedAnimal(req.params.id, req.user._id);
    res.status(200).json(updateAnimal)
  } catch (error) {
    console.error('Error liking animal:', err);
    res.status(400).json({ message: 'Failed to like animal. ' + err.message });  }
})

animalController.post('/:id/unlike', async (req, res) => {
  try {
    const updateAnimal = await unlikeAnimal(req.params.id, req.user._id);
    res.status(200).json(updateAnimal)
  } catch (error) {
    console.error('Error unliking animal:', err);
    res.status(400).json({ message: 'Failed to unlike animal. ' + err.message });  }
})

export default animalController;