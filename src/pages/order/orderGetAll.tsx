import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderAll } from '../../service/order.service';

export default function OrderGetAll() {
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const gitOnServer = async () => {
    const res = await OrderAll();
    setOrder(res);
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
        {order &&
          order.map((item: any) => (
            <div key={item.id}>
              <div>ID: {item.id}</div>
              <div>ID Користувача: {item.userId}</div>
              <div>ID Автомобіля: {item.carId}</div>
              <div>Список робіт: {item.workList}</div>
              <div>Час реєстрації запиту: {item.createData}</div>
            </div>
          ))}
      </div>
    </>
  );
}
