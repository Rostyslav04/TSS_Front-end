import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarAll } from '../../service/car.service';
import styles from './car.module.scss';

import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';

export default function CarGetAll() {
  const [car, setCar] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const navigate = useNavigate();

  const gitOnServer = async () => {
    try {
      const res = await CarAll();
      setCar(res);
    } catch (error) {
      console.error(error);
    }
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
    <div className={styles.container}>
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
          <div className={styles.nameButton}>
            <div className={styles.name}>Автомобілі</div>
          </div>
          {car.map((item: any) => (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => {
                setSelectedCar(item);
              }}
            >
              <div className={styles.margin}>{item.brand}</div>
              <div className={styles.PlateBlockMini}>
                <div className={styles.registerPlateBlueMini}>
                  <div className={styles.registerPlateFlagMini}>
                    <div className={styles.registerPlateFlagBlueMini}></div>
                    <div className={styles.registerPlateFlagYellowMini}></div>
                  </div>
                  <div className={styles.registerPlateUAMini}>UA</div>
                </div>
                <div className={styles.registerPlateTextMini}>{item.registerPlate}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.content1}>
            {selectedCar && (
              <div className={styles.infoBlock}>
                <div className={styles.infoUser}>
                  <div className={styles.idBlock}>
                    <div>ID: {selectedCar.id}</div>
                    <div>Бренд: {selectedCar.brand}</div>
                    <div>Модель: {selectedCar.model}</div>
                    <div>Рік: {selectedCar.year}</div>

                    <div className={styles.PlateBlock}>
                      <div className={styles.registerPlateBlue}>
                        <div className={styles.registerPlateFlag}>
                          <div className={styles.registerPlateFlagBlue}></div>
                          <div className={styles.registerPlateFlagYellow}></div>
                        </div>
                        <div className={styles.registerPlateUA}>UA</div>
                      </div>
                      <div className={styles.registerPlateText}>{selectedCar.registerPlate}</div>
                    </div>

                    <div>VIN: {selectedCar.VIN}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
