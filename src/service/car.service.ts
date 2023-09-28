import axios from 'axios';

export async function CarAll() {
  const car = await axios.get('http://localhost:3001/car/getAll');
  return car.data;
}