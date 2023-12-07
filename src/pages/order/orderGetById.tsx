import axios from 'axios';
import { useEffect, useState } from 'react';
import OrderDelete from '../order/orderDelete';
import styles from '../user/user.module.scss';
import DelIcon from '../../assets/svg/del.svg';

interface Order {
  workList: string;
  id: string;
}

interface IProps {
  carId: string;
}

export default function OrderGetById({ carId }: IProps) {
  const [selectOrder, setSelectOrder] = useState<Order | null>(null);
  const [OrderDeleteActive, setOrderDeleteActive] = useState(false);

  const orderToCar = async () => {
    try {
      const response = await axios.post('http://localhost:3001/order/getById', {
        carId,
      });
      setSelectOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderToCar();
  }, [carId]);

  return (
    <div>
      {selectOrder && (
        <>
          <div className={styles.workListName}>
            <h2>Список робіт</h2>
            <div className={styles.idButton}>
              <img src={DelIcon} alt="error" className={styles.ico} onClick={() => setOrderDeleteActive(true)} />
              <OrderDelete active={OrderDeleteActive} setActive={setOrderDeleteActive} orderId={selectOrder.id} />
            </div>
          </div>
          <div>
            <div>{selectOrder.workList}</div>
          </div>
        </>
      )}
    </div>
  );
}
