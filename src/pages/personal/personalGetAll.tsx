import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll } from '../../service/personal.service';
import styles from './personal.module.scss';
import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';
import DelIcon from '../../assets/svg/del.svg';
import PersonalDelete from './personalDelete';

export default function PersonalGetAll() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState<any>(null);
  const [UserDeleteActive, setUserDeleteActive] = useState(false);
  const navigate = useNavigate();
  const gitOnServer = async () => {
    const res = await getAll();
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
            <div className={styles.nameButton}>
              <div className={styles.name}>Персонал</div>
            </div>
            {data &&
              data.map((item: any) => (
                <>
                  <div
                    className={styles.item}
                    onClick={() => {
                      setSelectedPersonal(item);
                      console.log(item);
                    }}
                  >
                    {item.firstName} {item.lastName} {item.role}
                  </div>
                </>
              ))}
          </div>

          <div className={styles.content}>
            <div className={styles.content1}>
              {selectedPersonal && (
                <div className={styles.infoBlock}>
                  <div className={styles.infoUser}>
                    <div className={styles.idBlock}>
                      <div>ID: {selectedPersonal.id}</div>
                      <div className={styles.block}>
                        <div className={styles.idButton}>
                          <img
                            src={DelIcon}
                            alt="error"
                            className={styles.ico}
                            onClick={() => setUserDeleteActive(true)}
                          />
                          <PersonalDelete
                            active={UserDeleteActive}
                            setActive={setUserDeleteActive}
                            personalId={selectedPersonal.id}
                          />
                        </div>
                      </div>
                    </div>
                    <div>Ім'я: {selectedPersonal.firstName}</div>
                    <div>Прізвище: {selectedPersonal.lastName}</div>
                    <div>По батькові: {selectedPersonal.surName}</div>
                    <div>Телефон: {selectedPersonal.phone}</div>
                    <div>Email: {selectedPersonal.email}</div>
                    <div>Посада: {selectedPersonal.role}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
