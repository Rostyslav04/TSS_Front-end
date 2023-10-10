import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginFunction() {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        phone,
        password,
      });

      if (response.status === 200) {
        console.log('rebvbf');
        navigate('/car/getAll');
      } else {
        console.log('err');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pages = [
    {
      id: '/car/getAll',
      label: 'cars',
    },
    {
      id: '/user/getAll',
      label: 'users',
    },
    {
      id: '/car/create',
      label: 'car create',
    },
    {
      id: '/car/delete',
      label: 'car delete',
    },
    {
      id: '/',
      label: 'login',
    },
    {
      id: '/user/create',
      label: 'user create',
    },
    {
      id: '/user/delete',
      label: 'user delete',
    },
    {
      id: '/personal/delete',
      label: 'personal delete',
    },
    {
      id: '/personal/create',
      label: 'personal create',
    },
    {
      id: '/personal/getAll',
      label: 'personal',
    },
    {
      id: '/order/create',
      label: 'order create',
    },
    {
      id: '/order/getAll',
      label: 'order',
    },
    {
      id: '/order/delete',
      label: 'order delete',
    },
  ];

  return (
    <>
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => {
            setIsLoading(true);
            navigate(page.id);
          }}
          disabled={isLoading}
          type="button"
          className="btn btn-primary"
        >
          {page.label}
        </button>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Надіслати</button>
      </form>
    </>
  );
}
