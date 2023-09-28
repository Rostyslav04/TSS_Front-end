import axios from 'axios';

export async function Login() {
  const log = await axios.get('http://localhost:3001/user/login');
  return log.data;
}

export async function UserService() {
  const res = await axios.get('http://localhost:3001/user/getAll');
  return res.data;
}
