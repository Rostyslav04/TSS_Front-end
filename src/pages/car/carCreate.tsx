import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [registerPlate, setRegisterPlate] = useState('');
  const [VIN, setVIN] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/car/create', {
        VIN,
        model,
        year,
        registerPlate,
        brand,
      });

      if (response.status === 200) {
        console.log('Автомобіль створено!');
        navigate('/car/getAll');
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
        <input type="text" placeholder="Марка" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="text" placeholder="Модель" value={model} onChange={(e) => setModel(e.target.value)} />
        <input type="text" placeholder="Рік" value={year} onChange={(e) => setYear(e.target.value)} />
        <input
          type="text"
          placeholder="Номер"
          value={registerPlate}
          onChange={(e) => setRegisterPlate(e.target.value)}
        />
        <input type="text" placeholder="VIN" value={VIN} onChange={(e) => setVIN(e.target.value)} />
        <button type="submit">Надіслати</button>
      </form>
    </>
  );
}
