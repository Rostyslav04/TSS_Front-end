import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderAll } from '../../service/order.service';
import styles from './order.module.scss';
import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';

export default function OrderGetAll() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const gitOnServer = async () => {
    const res = await OrderAll();
    setOrder(res);
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
      <div>
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
            {order &&
              order.map((item: any) => (
                <>
                  <div
                    className={styles.item}
                    onClick={() => {
                      setSelectedOrder(item);
                    }}
                  >
                    {item.registerPlate} {item.brand}
                  </div>
                </>
              ))}
          </div>

          <div className={styles.content}>
            {selectedOrder && (
              <>
                <div>ID: {selectedOrder.id}</div>
                <div>ID Користувача: {selectedOrder.userId}</div>
                <div>ID Автомобіля: {selectedOrder.carId}</div>
                <div>Список робіт: {selectedOrder.workList}</div>
                <div>Час реєстрації запиту: {selectedOrder.createData}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
