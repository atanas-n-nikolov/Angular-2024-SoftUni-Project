import Animal from "../models/Animal.js";

export const findAll = async () => {
  const animals = await Animal.find();
  return animals;
};

export const create = async (animalData) => {
  const createdAnimal = await Animal.create(animalData);

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