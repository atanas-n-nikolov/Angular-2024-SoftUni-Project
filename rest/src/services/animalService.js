import Animal from "../models/Animal.js";
import User from "../models/User.js";

export const findAll = async () => {
  const animals = await Animal.find();
  return animals;
};

export const create = async (userId, animalData) => {
  const createdAnimal = await Animal.create({
    owner: userId,
    ...animalData
  });

  await User.findByIdAndUpdate(userId, {$push: {createdAnimals: createdAnimal._id}})

return createdAnimal;
}

export const latestAdopt = async () => {
  const animals = await Animal.find({ status: 'Adopt'}).sort({ createdAt: -1}).limit(3);
  return animals;
};

export const latestLostAndFound = async () => {
  const animals = await Animal.find({ status: { $in: ['Lost', 'Found']}}).sort({ createdAt: -1}).limit(3);
  return animals;
};

export const allAdopt = async () => {
  const animals = await Animal.find({ status: 'Adopt'});
  return animals;
};

export const allLostAndFound = async () => {
  const animals = await Animal.find({ status: { $in: ['Lost', 'Found']}});
  return animals;
};

export const animalById = async (id) => {
  const animal = await Animal.findById(id);
  return animal;
};

export const editAnimal = async (id, data) => Animal.findByIdAndUpdate(id, data, {runValidators: true});

export const deleteAnimal = async (id) => {
  await Animal.findByIdAndDelete(id);
};

export const likedAnimal = async (animalId, userId) => {
  const animal = await Animal.findById(animalId);
  animal.likes.push(userId);
  animal.save();
  const user = await User.findById(userId);
  user.likedAnimals.push(animalId);
  user.save();

  return animal;
}

export const unlikeAnimal = async (animalId, userId) => {
  const animal = await Animal.findById(animalId);
  animal.likes = animal.likes.filter(id => id.toString() !== userId);
  await animal.save()
  const user = await User.findById(userId);
  user.likedAnimals = user.likedAnimals.filter(id => id.toString() !== userId);
  await user.save();
  return animal;
}