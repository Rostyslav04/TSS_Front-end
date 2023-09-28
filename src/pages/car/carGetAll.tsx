import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarAll } from '../../service/car.service';

export default function CarGetAll() {
  const [car, setCar] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const gitOnServer = async () => {
    const res = await CarAll();
    setCar(res);
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
  ];

  useEffect(() => {
    gitOnServer();
  }, []);

  return (
    <>
      <div>
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
        {car &&
          car.map((item: any) => (
            <>
              <div>ID: {item.id}</div>
              <div>Марка: {item.brand}</div>
              <div>Модель: {item.model}</div>
              <div>Рік: {item.year}</div>
              <div>Номер: {item.registerPlate}</div>
              <div>VIN: {item.VIN}</div>
            </>
          ))}
      </div>
    </>
  );
}
