import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarAll } from '../../service/car.service';
import styles from './car.module.scss';
import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';

export default function CarGetAll() {
  const [car, setCar] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const navigate = useNavigate();
  const gitOnServer = async () => {
    const res = await CarAll();
    setCar(res);
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
            {car &&
              car.map((item: any) => (
                <>
                  <div
                    className={styles.item}
                    onClick={() => {
                      setSelectedCar(item);
                      console.log(item);
                    }}
                  >
                   {item.registerPlate} {item.brand} 
                  </div>
                </>
              ))}
          </div>

          <div className={styles.content}>
            {selectedCar && (
              <>
                <div>ID: {selectedCar.id}</div>
                <div>Марка: {selectedCar.brand}</div>
                <div>Модель: {selectedCar.model}</div>
                <div>Рік: {selectedCar.year}</div>
                <div>Номер: {selectedCar.registerPlate}</div>
                <div>VIN: {selectedCar.VIN}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
