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
              <div>{item.brand}</div>
              <div>{item.model}</div>
              <div>{item.year}</div>
              <div>{item.registerPlate}</div>
              <div>{item.VIN}</div>
            </>
          ))}
      </div>
    </>
  );
}
