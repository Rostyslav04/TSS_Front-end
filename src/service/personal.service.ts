import axios from 'axios';

export async function getAll() {
  const res = await axios.get('http://localhost:3001/personal/getAll');
  return res.data;
}
