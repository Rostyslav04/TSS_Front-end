import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../service/user.service';
import styles from './user.module.scss';
import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';
import CopyIcon from '../../assets/svg/copy.svg';
import DelIcon from '../../assets/svg/del.svg';
import Plate from '../../assets/img/Plate.png';
import UserCreate from './userCreate';
import UserDelete from './userDelete';
import CarCreate from '../car/carCreate';
import CarDelete from '../car/carDelete';
import OrderCreate from '../order/orderCreate'
import axios from 'axios';

export default function UserGetAll() {
  const [data, setData] = useState<any>(null);
  const [userCars, setUserCars] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [PopUpActive, setPopUpActive] = useState(false);
  const [CarCreateActive, setCarCreateActive] = useState(false);
  const [OrderCreateActive, setOrderCreateActive] = useState(false);
  const [UserDeleteActive, setUserDeleteActive] = useState(false);
  const [CarDeleteActive, setCarDeleteActive] = useState(false);
  const navigate = useNavigate();
  const copyText = () => {
    navigator.clipboard.writeText(`${selectedUser.id}`);
    const message = document.createElement('alert');
    message.classList.add('message');
    message.textContent = 'Скопійовано';
    document.body.appendChild(message);
    setTimeout(() => {
      message.remove();
    }, 500);
  };

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

  const userToCar = async () => {
    try {
      const response = await axios.post('http://localhost:3001/userToCar/getAll', {
        userId: selectedUser.id,
      });
      setUserCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gitOnServer();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      userToCar();
    }
  }, [selectedUser]);

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
          <div className={styles.nameButton}>
            <div className={styles.name}>Клієнти</div>
            <div>
              <div className={styles.createButton} onClick={() => setPopUpActive(true)}>
                +
              </div>
              <UserCreate active={PopUpActive} setActive={setPopUpActive} />
            </div>
          </div>
          {data &&
            data.map((item: any) => (
              <div
                key={item.id}
                className={styles.item}
                onClick={() => {
                  setSelectedUser(item);
                }}
              >
                {item.firstName} {item.lastName}
              </div>
            ))}
        </div>
        <div className={styles.content}>
          <div className={styles.content1}>
            {selectedUser && (
              <>
                <div className={styles.infoBlock}>
                  <div className={styles.infoUser}>
                    <div className={styles.idBlock}>
                      <div>ID: {selectedUser.id}</div>
                      <div className={styles.block}>
                        <div className={styles.idButton}>
                          <img src={CopyIcon} alt="error" className={styles.ico} onClick={copyText} />
                        </div>
                        <div className={styles.idButton}>
                          <img
                            src={DelIcon}
                            alt="error"
                            className={styles.ico}
                            onClick={() => setUserDeleteActive(true)}
                          />
                          <UserDelete
                            active={UserDeleteActive}
                            setActive={setUserDeleteActive}
                            userId={selectedUser.id}
                          />
                        </div>
                      </div>
                    </div>
                    <div>Ім'я: {selectedUser.firstName}</div>
                    <div>Прізвище: {selectedUser.lastName}</div>
                    <div>По батькові: {selectedUser.surName}</div>
                    <div>Телефон: {selectedUser.phone}</div>
                    <div>Email: {selectedUser.email}</div>
                  </div>

                  <div className={styles.createCarButton}>
                    <div className={styles.border}>--------------------------------------------------</div>
                    <div className={styles.createCar} onClick={() => setCarCreateActive(true)}>
                      Додати авто
                    </div>
                    <CarCreate active={CarCreateActive} setActive={setCarCreateActive} userIdImport={selectedUser.id} />
                  </div>
                  <div className={styles.userCarsBlock}>
                    <div className={styles.userCars}>
                      {userCars &&
                        userCars.map((carInfo: any) => (
                          <>
                            <div
                              key={carInfo.id}
                              className={styles.carItem}
                              onClick={() => {
                                setSelectedCar(carInfo);
                              }}
                            >
                              <div>{carInfo.brand}</div>
                              <div>{carInfo.year}</div>
                              <div className={styles.PlateBlock}>
                                <img src={Plate} alt="error" className={styles.Plate} />
                                <div className={styles.PlateText}>{carInfo.registerPlate}</div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {selectedUser && (
            <div className={styles.content2}>
              {selectedCar && (
                <>
                  <div className={styles.carInfo}>
                    <div className={styles.deleteButton}>
                      <div>Марка: {selectedCar.brand}</div>
                      <div className={styles.idButton} onClick={() => setCarDeleteActive(true)}>
                        <img src={DelIcon} alt="error" className={styles.ico} />
                        <CarDelete active={CarDeleteActive} setActive={setCarDeleteActive} carId={selectedCar.id} />
                      </div>
                    </div>
                    <div>Модель: {selectedCar.model}</div>
                    <div>Рік: {selectedCar.year}</div>
                    <div>VIN: {selectedCar.VIN}</div>
                    <div className={styles.PlateBlock}>
                      <img src={Plate} alt="error" className={styles.Plate} />
                      <div className={styles.PlateText}>{selectedCar.registerPlate}</div>
                    </div>
                  </div>
                  <div className={styles.createOrderButton}>
                    <div className={styles.border}>-------------------------------------------</div>
                    <div className={styles.createOrder} onClick={() => setOrderCreateActive(true)}>
                      Додати список робіт
                    </div>
                    <OrderCreate active={OrderCreateActive} setActive={setOrderCreateActive} userIdImport={selectedUser.id} carIdImport={selectedCar.id}/>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
