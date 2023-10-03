import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [surName, setSurName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/create', {
        firstName,
        lastName,
        surName,
        age,
        phone,
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Користувача створено!');
        navigate('/user/getAll');
      } else {
        console.log('Виникла помилка!');
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
        <input type="text" placeholder="Ім'я" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Прізвище" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="По батькові" value={surName} onChange={(e) => setSurName(e.target.value)} />
        <input type="text" placeholder="Вік" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Надіслати</button>
      </form>
    </>
  );
}
