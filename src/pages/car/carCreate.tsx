import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Create } from '../../service/car.service';

export default function CarCreate() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [registerPlate, setRegisterPlate] = useState('');
  const [VIN, setVIN] = useState('');
  const navigate = useNavigate();

  const gitOnServer = async () => {
    const res = await Create();
    setData(res);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/car/create', data);

      if (response.status === 200) {
        console.log('Дякуємо за повідомлення!');
      } else {
        console.log('Виникла помилка!');
      }
    } catch (error) {}
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
  ];

  useEffect(() => {
    gitOnServer();
  }, []);

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
