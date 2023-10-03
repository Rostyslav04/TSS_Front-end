import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../service/user.service';

export default function UserGetAll() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const gitOnServer = async () => {
    const res = await UserService();
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
              <div>Ім'я: {item.firstName}</div>
              <div>Прізвище: {item.lastName}</div>
              <div>По батькові: {item.surName}</div>
              <div>Телефон: {item.phone}</div>
              <div>Email: {item.email}</div>
            </>
          ))}
      </div>
    </>
  );
}
