import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../service/user.service';
import styles from './user.module.scss';
import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';

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
      label: 'Автомобілі',
    },
    {
      id: '/user/getAll',
      label: 'Клієнти',
    },
    {
      id: '/personal/getAll',
      label: 'Персонал',
    },
    {
      id: '/order/getAll',
      label: 'Заявки',
    },
  ];

  useEffect(() => {
    gitOnServer();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header1}>
          <img src={LogoImg} alt="error" className={styles.logoImg} />
          <div
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <img src={exitImg} alt="error" className={styles.exitImg} />
          </div>
        </div>
        <div className={styles.header2}>
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

        <div className={styles.createCar}>{/* <button>+</button> */}</div>
      </div>
    </>
  );
}
