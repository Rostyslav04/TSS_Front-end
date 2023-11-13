import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../service/user.service';
import styles from './user.module.scss';

export default function UserGetAll() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
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
    {
      id: '/userToCar/create',
      label: 'userToCar create',
    },
  ];

  useEffect(() => {
    gitOnServer();
  }, []);

  return (
    <>
      <div className={styles.header}>
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => {
              setIsLoading(true);
              navigate(page.id);
            }}
            disabled={isLoading}
            type="button"
            className={styles.btn}
          >
            {page.label}
          </button>
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.sidebar}>
          {data &&
            data.map((item: any) => (
              <>
                <div
                  className={styles.item} 
                  onClick={() => {
                    setSelectedUser(item);
                    console.log(item);
                  }}
                >
                  {item.firstName} {item.lastName} {item.surName}
                </div>
              </>
            ))}
        </div>

        <div className={styles.content}>
          {selectedUser && (
            <>
              <div>ID: {selectedUser.id}</div>
              <div>Ім'я: {selectedUser.firstName}</div>
              <div>Прізвище: {selectedUser.lastName}</div>
              <div>По батькові: {selectedUser.surName}</div>
              <div>Телефон: {selectedUser.phone}</div>
              <div>Email: {selectedUser.email}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
