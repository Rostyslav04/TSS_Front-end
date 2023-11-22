import axios from 'axios';

export async function userToCarAll() {
  const car = await axios.get('http://localhost:3001/userToCar/getAll');
  return car.data;
}