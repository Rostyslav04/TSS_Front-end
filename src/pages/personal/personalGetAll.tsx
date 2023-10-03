import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll } from '../../service/personal.service';

export default function PersonalGetAll() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const gitOnServer = async () => {
    const res = await getAll();
    setData(res);
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
        {data &&
          data.map((item: any) => (
            <>
              <div>ID: {item.id}</div>
              <div>Ім'я: {item.firstName}</div>
              <div>Прізвище: {item.lastName}</div>
              <div>По батькові: {item.surName}</div>
              <div>Телефон: {item.phone}</div>
              <div>Email: {item.email}</div>
              <div>Посада: {item.role}</div>
            </>
          ))}
      </div>
    </>
  );
}
