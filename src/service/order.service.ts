import axios from 'axios';

export async function OrderAll() {
  const order = await axios.get('http://localhost:3001/order/getAll');
  return order.data;
}