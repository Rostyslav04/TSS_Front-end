import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../service/user.service';
import styles from './user.module.scss';
import LogoImg from '../../../src/assets/img/logo.png';
import exitImg from '../../../src/assets/img/exit.png';
import UserCreate from './userCreate';
import CopyIcon from '../../assets/svg/copy.svg';
import DelIcon from '../../assets/svg/del.svg';
import UserDelete from './userDelete';

export default function UserGetAll() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [PopUpActive, setPopUpActive] = useState(false);
  const [UserDeleteActive, setUserDeleteActive] = useState(false);
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
                </div>
              </>
            )}
          </div>
          {selectedUser && (
            <div className={styles.content2}>
              <div className={styles.right}>
                  <div className={styles.createCar}>+ add</div> 
                </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
