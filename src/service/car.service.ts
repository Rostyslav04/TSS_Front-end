import axios from 'axios';

export async function CarAll() {
  const car = await axios.get('http://localhost:3001/car/getAll');
  return car.data;
}

export async function Create() {
  const create = await axios.get('http://localhost:3001/car/create')
  return create.data
}