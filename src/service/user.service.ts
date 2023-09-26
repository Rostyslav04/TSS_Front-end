import axios from 'axios';

export default async function UserService() {
  const res = await axios.get('http://localhost:3001/user/getAll');
  return res.data;
}
